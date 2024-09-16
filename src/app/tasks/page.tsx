"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useReducer,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

const Tasks = () => {
  const [record, setRecord] = useState(true);
  const [totalHour, settotalHour] = useState(0);
  const [weeklytotalHour, setWeeklytotalHour] = useState(0);
  const [display, setDisplay] = useState("ALL");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  //学習時間取得
  const fetchData = async (content: string) => {
    const res = await fetch(`${API_URL}/api/record`, {
      method: "GET",
      cache: "no-store",
    });
    const datas = await res.json();

    const now = new Date();
    const dayOfWeek = now.getDay();
    const currentMonday = new Date(now);
    currentMonday.setDate(now.getDate() - dayOfWeek + 1);
    currentMonday.setHours(0, 0, 0, 0);

    let [totalHour, weeklytotalHour] = [0, 0];

    datas.forEach((data: formState) => {
      if (content === "ALL" || data.content === content) {
        const hourToMinute = parseFloat(
          (Number(data.hour) + Number(data.minute) / 60).toFixed(1)
        );
        totalHour += hourToMinute;
        if (new Date(data.date) >= currentMonday) {
          weeklytotalHour += hourToMinute;
        }
      }
    });

    settotalHour(totalHour);
    setWeeklytotalHour(weeklytotalHour);
  };

  //学習時間表示（初レンダリング）
  useEffect(() => {
    fetchData("ALL");
  }, []);

  type formState = {
    key: string;
    date: string;
    hour: string;
    minute: string;
    content: string;
  };

  type formAction = {
    type: "RECORD";
    field: "key" | "date" | "hour" | "minute" | "content";
    payload: string;
  };

  //フォーム変更
  function formReducer(state: formState, action: formAction) {
    switch (action.type) {
      case "RECORD":
        return {
          ...state,
          [action.field]: action.payload,
        };
      default:
        return state;
    }
  }

  //フォーム初期値
  const initialstate: formState = {
    key: uuidv4(),
    date: format(new Date(), "yyyy-MM-dd"),
    hour: "0",
    minute: "0",
    content: "CA",
  };

  //フォーム入力状態
  const [state, dispatch] = useReducer(formReducer, initialstate);

  //日時変更
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "RECORD",
      field: "date",
      payload: e.target.value,
    });
  };

  //時間・学習内容変更
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "RECORD",
      field: e.target.name as "hour" | "minute" | "content",
      payload: e.target.value,
    });
  };

  //フォーム送信
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({
      type: "RECORD",
      field: "key",
      payload: uuidv4(),
    });

    await fetch(`${API_URL}/api/record`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: state.key,
        date: state.date,
        hour: state.hour,
        minute: state.minute,
        content: state.content,
      }),
    });

    //学習時間更新
    setDisplay(state.content);
    fetchData(state.content);
    const hourToMinute = Number(state.hour) * 60 + Number(state.minute);
    alert(`お疲れ様です！ ${hourToMinute}分の達成ですね！`);
  };

  //勉強時間のラベル変更
  const handleDisplayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDisplay(e.target.value);
    fetchData(e.target.value);
  };

  //レンダー
  return (
    <main className="bg-green-100 md:h-screen w-screen">
      <div className="p-10">
        <section>
          <h1 className="md:text-4xl text-2xl font-bold">目標 </h1>
          <h2 className="md:text-3xl text-xl font-bold pt-3 pl-10">
            公認会計士 <br />{" "}
            <span className="text-red-500 px-3">2025年12月</span> 1次試験合格
          </h2>
        </section>
        <section className="flex flex-row pt-10">
          <h2 className="md:text-4xl text-2xl font-bold">成果</h2>
          <button
            onClick={() => setRecord(!record)}
            className="bg-blue-100 text-blue-900 rounded-xl font-bold px-5 mx-5 md:text-xl shadow-md hover:text-red-500"
          >
            記録
          </button>
          <button className="bg-yellow-100 text-yellow-900 font-bold rounded-xl px-5 md:text-xl shadow-md hover:text-red-500">
            変更
          </button>
        </section>

        {record && (
          <section className="py-5 md:px-0 px-10 mt-10 md:mx-32 border-4 border-green-300 rounded-lg">
            <form
              onSubmit={handleSubmit}
              className="flex md:flex-row flex-col justify-center"
            >
              <h3 className="md:text-2xl text-lg font-bold">日付</h3>
              <input
                required
                type="date"
                name="date"
                value={state.date}
                onChange={handleInputChange}
                className="px-4 mx-4 font-bold md:my-0 my-2"
              />
              <h3 className="md:text-2xl text-lg font-bold">時間</h3>
              <div className="flex flex-row md:my-0 my-2">
                <select
                  name="hour"
                  value={state.hour}
                  onChange={handleSelectChange}
                  className="ml-4 mr-2 font-bold"
                >
                  {Array.from({ length: 13 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
                <h3 className="md:text-2xl text-lg font-bold">:</h3>
                <select
                  name="minute"
                  value={state.minute}
                  onChange={handleSelectChange}
                  className="mx-4 font-bold"
                >
                  {Array.from({ length: 7 }, (_, i) => (
                    <option key={i + 1} value={i * 10}>
                      {i * 10}
                    </option>
                  ))}
                </select>
              </div>
              <h3 className="md:text-2xl text-lg font-bold">学習内容</h3>
              <select
                name="content"
                value={state.content}
                onChange={handleSelectChange}
                className="font-bold mx-4 px-2 md:my-0 my-2"
              >
                <option value="CA">会社法</option>
                <option value="FA">財務会計論</option>
              </select>
              <input
                type="submit"
                value="追加"
                className="bg-blue-100 text-blue-900 md:mt-0 mt-4 rounded-xl font-bold px-5 ml-5 text-xl shadow-md hover:text-red-500"
              />
            </form>
          </section>
        )}

        <section className="flex md:flex-row flex-col pt-10 md:pl-20 pb-96">
          <div className="flex items-center md:w-2/6 w-1/2 md:mx-0 mx-auto mb-5">
            <select
              value={display}
              onChange={handleDisplayChange}
              className="md:text-3xl text-xl font-bold border-4 rounded-3xl p-3 border-neutral-800 bg-green-100"
            >
              <option value="ALL">全体</option>
              <option value="CA">会社法</option>
              <option value="FA">財務会計論</option>
            </select>
          </div>
          <div className="flex flex-row">
            <div className="md:w-2/6 w-1/2 flex flex-col items-center">
              <h3 className="font-bold pb-4">今週の勉強時間</h3>
              <h1 className="md:text-7xl text-5xl font-bold">
                {weeklytotalHour} <span className="text-xl">時間</span>
              </h1>
            </div>
            <div className="md:w-2/6 w-1/2 flex flex-col items-center">
              <h3 className="font-bold pb-4">全期間の勉強時間</h3>
              <h1 className="md:text-7xl text-5xl font-bold">
                {totalHour} <span className="text-xl">時間</span>
              </h1>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Tasks;
