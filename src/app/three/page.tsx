"use client";
import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { GridHelper, Mesh } from "three";

//各種型指定
type Position = [number, number, number];
type Information = {
  id: number,
  name: string;
  url: string;
  position: Position;
  detail: string;
};
interface BoxProps {
  name: string;
  url: string;
  position: [number, number, number];
  detail: string;
  zoomed: boolean;
  setZoomed: Dispatch<SetStateAction<boolean>>;
}
interface BackProps {
  position: Position;
  handleZoomOut: () => void;
}
interface ButtonProps {
  position: Position;
  url: string;
}

//カメラの初期値
const cam: Position[] = [
  [0, 7, 10], //position初期値
  [0, 0, 0], //viewpoint初期値
];

//天体のデータ
const data: Information[] = [
  {
    id: 1,
    name: "単語",
    url: "/wordsList",
    position: [4, 0, 4],
    detail:
      "単語は言語の最小単位であり、意味を持つ語のことを指します。語彙力を増やすことで、言語の理解と使用がより豊かになります。単語は文脈によって意味が変わることもあるため、適切な使い方を覚えることが重要です。",
  },
  {
    id: 2,
    name: "公認会計士",
    url: "/tasks",
    position: [-4, 0, 4],
    detail:
      "文法は、言語を構成するルールの体系であり、正しい文を作るための規則です。これには、語の順序や時制、数、性などが含まれます。文法を理解することで、意味が明確で正確なコミュニケーションが可能になります。",
  },
  {
    id: 3,
    name: "目標",
    url: "",
    position: [4, 0, -4],
    detail:
      "リスニングは、音声情報を聞き取って理解する能力です。これは、会話や講義、音声メディアを聞くことで養われるスキルであり、発音やイントネーション、文脈を理解することが求められます。リスニング力を高めることで、よりスムーズなコミュニケーションが可能になります。",
  },
  {
    id: 4,
    name: "筋トレ",
    url: "",
    position: [-4, 0, -4],
    detail:
      "ライティングは、自分の考えや意見を文字で表現する能力です。これには、文法や語彙の適切な使用、構成の工夫が含まれます。ライティングスキルを向上させることで、効果的な文章作成ができるようになります。",
  },
];

//天体
function Box({ name, url, position, detail, zoomed, setZoomed }: BoxProps) {
  const ref = useRef<Mesh>(null);
  const { camera } = useThree();
  const [hovered, sethovered] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [info, setInfo] = useState(false);

  //ホバー
  const { scale } = useSpring({
    scale: hovered ? 1.5 : 1,
  });

  //回転
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
    }
  });

  //ズーム時のカメラ位置
  const { cameraPosition, cameraViewpoint } = useSpring({
    cameraPosition: clicked
      ? [position[0] + 1, position[1], position[2] + 2.5]
      : cam[0],
    cameraViewpoint: clicked
      ? [position[0] + 1, position[1], position[2]]
      : cam[1],
    config: { duration: 800 },
    onChange: ({ value }) => {
      camera.position.set(
        value.cameraPosition[0],
        value.cameraPosition[1],
        value.cameraPosition[2]
      );
      camera.lookAt(
        value.cameraViewpoint[0],
        value.cameraViewpoint[1],
        value.cameraViewpoint[2]
      );
    },
  });

  //クリック時
  useEffect(() => {
    if (clicked) {
      setZoomed(true); //他の天体をホバーしたりクリックできないようにする
      setTimeout(() => {
        setInfo(true); //天体の情報を表示する
      }, 800);
    }
  }, [clicked]);

  //back
  const handleZoomOut = () => {
    sethovered(false);
    setclicked(false);
    setInfo(false);
    setZoomed(false);
  };

  //detailの改行
  function wrapDetail(maxWidth: number) {
    const lines = [];
    for (let start = 0; start < detail.length; start += maxWidth) {
      lines.push(detail.substring(start, start + maxWidth));
    }
    return lines.join("\n");
  }

  //レンダー
  return (
    <animated.group>
      <animated.mesh
        position={position}
        ref={ref}
        scale={scale}
        onPointerOver={() => {
          if (!zoomed) {
            sethovered(true);
          }
        }}
        onPointerOut={() => {
          if (!zoomed) {
            sethovered(false);
          }
        }}
        onClick={() => {
          if (!zoomed) {
            setclicked(true);
          }
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="hotpink"
          transparent
          opacity={zoomed && !clicked ? 0.5 : 1}
        />
      </animated.mesh>

      <mesh>
        <Text
          position={[position[0] - 2, position[1] + 1.5, position[2] - 1]}
          fontSize={1}
          color={"black"}
          rotation={[Math.PI / -6, 0, 0]}
          visible={hovered && !zoomed}
        >
          {name}
        </Text>
      </mesh>

      <mesh>
        <Fragment>
          <Text
            position={[position[0] + 1.2, position[1] + 1.2, position[2]]}
            fontSize={0.5}
            anchorX="left"
            color={"black"}
            visible={info}
          >
            {name}
          </Text>
          <Text
            position={[position[0] + 1.2, position[1] + 0.4, position[2]]}
            fontSize={0.11}
            color={"black"}
            lineHeight={1.5}
            anchorX={"left"}
            visible={info}
          >
            {wrapDetail(25)}
          </Text>
          {info && (
            <Fragment>
              <Back position={position} handleZoomOut={handleZoomOut} />
              <Start position={position} url={url} />
              <Continue position={position} url={url} />
            </Fragment>
          )}
        </Fragment>
      </mesh>
    </animated.group>
  );
}

//戻るボタン
function Back({ position, handleZoomOut }: BackProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Text
      position={[position[0] - 1.9, position[1] + 1.45, position[2]]}
      color={hovered ? "red" : "black"}
      fontSize={hovered ? 0.4 : 0.3}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleZoomOut}
    >
      戻る
    </Text>
  );
}

//学習始めるボタン
function Start({ position, url }: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  return (
    <group>
      <mesh position={[position[0] + 2.6, position[1] - 0.4, position[2]]}>
        <planeGeometry args={[2.5, 0.5]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>
      <Text
        position={[position[0] + 2.6, position[1] - 0.4, position[2]]}
        color={hovered ? "red" : "hotpink"}
        fontSize={0.3}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => router.push(url)}
      >
        学習を始める
      </Text>
    </group>
  );
}

//続きから始めるボタン
function Continue({ position, url }: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <Text
      position={[position[0] + 3.3, position[1] - 0.9, position[2]]}
      color={hovered ? "red" : "black"}
      fontSize={0.2}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        router.push(url);
      }}
    >
      続きから始める
    </Text>
  );
}

//レンダー
const Three = () => {
  const [zoomed, setZoomed] = useState(false); //ズーム時に他の天体をホバーしたりクリックできないようにする
  return (
    <section className="h-screen">
      <Canvas camera={{ position: cam[0] }}>
        {/*<gridHelper position={[0, 0, 0]} args={[20, 20, "gray", "gray"]} />;*/}
        <ambientLight intensity={0.1} />
        <directionalLight position={[2, 5, 10]} intensity={1} />
        {data.map(({ id, name, url, position, detail }) => (
          <Box
            key={id}
            name={name}
            url={url}
            position={position}
            detail={detail}
            zoomed={zoomed}
            setZoomed={setZoomed}
          />
        ))}
      </Canvas>
    </section>
  );
};

export default Three;
