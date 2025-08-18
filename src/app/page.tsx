"use client";
import InputPages from "@/components/element-tags/InputPages";
import Textarea from "@/components/element-tags/Textarea";
import { useFormStore } from "@/hooks/useFormStore";
import { arrKeys } from "@/keys";
import { apiClient } from "@/utils/apiClient";
// import { apiClient } from "@/utils/apiClient";
import React, { useEffect, useState } from "react";
import InputFile from "../components/element-tags/InputFile";

// interface ArrData {
//   [key: string]: string;
// }
interface defDataARRTypeContent {
  title: string;
  price: string;
}

interface defDataARRType {
  id: number;
  title: string;
  content: defDataARRTypeContent[];
  subContent: defDataARRTypeContent[];
}

const defDataARR = [
  {
    id: 1,
    title: "VIP",
    content: [
      {
        title: "S 13,2-13-5 м²",
        price: `39.000`,
      },
      {
        title: "M 13,5-15 м²",
        price: `42.000`,
      },
      {
        title: "L 15-16 м²",
        price: `44.250`,
      },
      {
        title: "B1 16,1-17 м²",
        price: `45.750`,
      },
      {
        title: "B2 17-26,2 м²",
        price: `48.000`,
      },
      {
        title: "F1 2x2 м",
        price: `67.500`,
      },
      {
        title: "F2 2x2 м",
        price: `68.625`,
      },
      {
        title: "F3 3м/м",
        price: `115.388`,
      },
    ],
    subContent: [
      {
        title: "Мото 5,3-83,4 м²",
        price: `13.200`,
      },
      {
        title: "Мото 5,3-83,4 м²",
        price: `14.300`,
      },
    ],
  },
  {
    id: 2,
    title: "Platinum",
    content: [
      {
        title: "S 13,2-13-5 м²",
        price: `36.000`,
      },
      {
        title: "M 13,5-15 м²",
        price: `49.000`,
      },
      {
        title: "L 15-16 м²",
        price: `41.250`,
      },
      {
        title: "B1 16,1-17 м²",
        price: `42.750`,
      },
      {
        title: "B2 17-26,2 м²",
        price: `45.000`,
      },
      {
        title: "F1 2x2 м",
        price: `59.250`,
      },
      {
        title: "F2 2x2 м",
        price: `61.500`,
      },
      {
        title: "F3 3м/м",
        price: `96.900`,
      },
    ],
    subContent: [
      {
        title: "Мото 5,3-83,4 м²",
        price: `13.200`,
      },
      {
        title: "Мото 5,3-83,4 м²",
        price: `14.300`,
      },
    ],
  },
  {
    id: 3,
    title: "GOLD",
    content: [
      {
        title: "S 13,2-13-5 м²",
        price: `34.500`,
      },
      {
        title: "M 13,5-15 м²",
        price: `36.000`,
      },
      {
        title: "L 15-16 м²",
        price: `37.500`,
      },
      {
        title: "B1 16,1-17 м²",
        price: `39.000`,
      },
      {
        title: "B2 17-26,2 м²",
        price: `41.250`,
      },
      {
        title: "F1 2x2 м",
        price: `51.750`,
      },
      {
        title: "F2 2x2 м",
        price: `54.000`,
      },
      {
        title: "F3 3м/м",
        price: `92.900`,
      },
    ],
    subContent: [
      {
        title: "Мото 5,3-83,4 м²",
        price: `13.200`,
      },
      {
        title: "Мото 5,3-83,4 м²",
        price: `14.300`,
      },
    ],
  },
  {
    id: 4,
    title: "SILVER",
    content: [
      {
        title: "S 13,2-13-5 м²",
        price: `32.250`,
      },
      {
        title: "M 13,5-15 м²",
        price: `34.050`,
      },
      {
        title: "L 15-16 м²",
        price: `35.550`,
      },
      {
        title: "B1 16,1-17 м²",
        price: `36.750`,
      },
      {
        title: "B2 17-26,2 м²",
        price: `37.500`,
      },
      {
        title: "F1 2x2 м",
        price: `51.075`,
      },
      {
        title: "F2 2x2 м",
        price: `53.325`,
      },
      {
        title: "F3 3м/м",
        price: `89.250`,
      },
    ],
    subContent: [
      {
        title: "Мото 5,3-83,4 м²",
        price: `13.200`,
      },
      {
        title: "Мото 5,3-83,4 м²",
        price: `14.300`,
      },
    ],
  },
  {
    id: 5,
    title: "GREEN",
    content: [
      {
        title: "S 13,2-13-5 м²",
        price: `30.000`,
      },
      {
        title: "M 13,5-15 м²",
        price: `31.800`,
      },
      {
        title: "L 15-16 м²",
        price: `33.300`,
      },
      {
        title: "B1 16,1-17 м²",
        price: `36.000`,
      },
      {
        title: "B2 17-26,2 м²",
        price: `36.750`,
      },
      {
        title: "F1 2x2 м",
        price: `45.000`,
      },
      {
        title: "F3 3м/м",
        price: `66.600`,
      },
    ],
    subContent: [
      {
        title: "Мото 5,3-83,4 м²",
        price: `13.200`,
      },
      {
        title: "Мото 5,3-83,4 м²",
        price: `14.300`,
      },
    ],
  },
  {
    id: 6,
    title: "WHITE",
    content: [
      {
        title: "S 13,2-13-5 м²",
        price: `28.500`,
      },
      {
        title: "M 13,5-15 м²",
        price: `29.550`,
      },
      {
        title: "L 15-16 м²",
        price: `32.250`,
      },
      {
        title: "B1 16,1-17 м²",
        price: `34.500`,
      },
      {
        title: "F1 2x2 м",
        price: `42.750`,
      },
    ],
    subContent: [
      {
        title: "Мото 5,3-83,4 м²",
        price: `13.200`,
      },
      {
        title: "Мото 5,3-83,4 м²",
        price: `14.300`,
      },
    ],
  },
];

export default function Home() {
  const { data, errors, setData } = useFormStore();
  const [loading, setLoading] = useState<boolean>(false);

  const [selection, setSelection] = useState<number>(1);
  const [haveKeys, setHaveKeys] = useState<string[]>([""]);
  const [dataArrBox4_1, setDataArrBox4_1] =
    useState<defDataARRType[]>(defDataARR);

  async function sendSequentialRequests() {
    setLoading(true);
    for (const [key, value] of Object.entries(data)) {
      const dataItem = {
        name: key,
        value: String(value),
      };
      try {
        let res;
        if (haveKeys.includes(key)) {
          res = await apiClient.patch("/api/content", dataItem);
        } else {
          res = await apiClient.post("/api/content", dataItem);
        }
        console.log("res", res);
      } catch (e) {
        console.error("Error with key:", key, e);
      }
    }
    setLoading(false);
  }

  const onSend = () => {
    // const formValid = validate(ValidData);

    // if (formValid) {
    // const arrData: ArrData[] =
    // Object.entries(data).map(async ([key, value]) => {
    //   const dataItem = {
    //     name: key,
    //     value: String(value),
    //   };
    //   try {
    //     if (haveKeys.includes(key)) {
    //       const res = await apiClient.patch("/api/content", dataItem);
    //       console.log("res", res);
    //     } else {
    //       const res = await apiClient.post("/api/content", dataItem);
    //       console.log("res", res);
    //     }
    //   } catch (e) {
    //     console.error(e);
    //   }
    // });
    sendSequentialRequests();

    // console.log(arrData);
    // const res = apiClient.post("/api/content/all", data);

    // }
  };

  const getItems = async (key: string) => {
    try {
      const res = await apiClient(`content?name=${key}`);
      console.log(res);
      const data = res.data.data;
      if (data) {
        setData(data?.name, data?.value);
        return data?.name;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getData = async () => {
    const haveKeysData: string[] = [];

    for (const key of arrKeys) {
      const dataName = await getItems(key);
      if (dataName) haveKeysData.push(dataName);
    }

    setHaveKeys(haveKeysData);
  };

  const onChangeBox4_1 = (
    key: string,
    value: string,
    i: number,
    params: string
  ) => {
    if (params === "subContent") {
      const subContent = dataArrBox4_1
        .filter((e) => e.id === selection)[0]
        ?.subContent?.map((e, index) => {
          if (index === i) {
            return { ...e, [key]: value };
          } else {
            return e;
          }
        });
      console.log("subContent", subContent);

      setDataArrBox4_1(
        dataArrBox4_1.map((e) => {
          if (e.id === selection) {
            return { ...e, subContent: subContent };
          } else {
            return e;
          }
        })
      );
      setData(
        "dataArrBox4_1",
        // JSON.stringify(
        //   dataArrBox4_1.map((e) => {
        //     if (e.id === selection) {
        //       return { ...e, subContent: subContent };
        //     } else {
        //       return e;
        //     }
        //   }),
        // ),
        "test"
      );
    } else {
      const content = dataArrBox4_1
        .filter((e) => e.id === selection)[0]
        ?.content?.map((e, index) => {
          if (index === i) {
            return { ...e, [key]: value };
          } else {
            return e;
          }
        });
      console.log("content", content);

      setDataArrBox4_1(
        dataArrBox4_1.map((e) => {
          if (e.id === selection) {
            return { ...e, content: content };
          } else {
            return e;
          }
        })
      );
      setData(
        "dataArrBox4_1",
        JSON.stringify(
          dataArrBox4_1.map((e) => {
            if (e.id === selection) {
              return { ...e, content: content };
            } else {
              return e;
            }
          })
        )
      );
    }
  };

  const onChangeFile = async (
    key: string,
    e?: React.ChangeEvent<HTMLInputElement>
  ): Promise<false | { res: boolean; data: string }> => {
    try {
      const data = new FormData();
      data.append("key", key);
      data.append("file", e?.target?.files?.[0] as File);
      if (e?.target?.files?.[0]) {
        const res = await apiClient.post("api/files", data);
        return {
          res: !!res as boolean,
          data: res.data.data.fileName as string,
        };
      } else {
        const res = await apiClient.get(`api/files?key=${key}`);
        return { res: true, data: res.data.data.fileName as string };
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const getDataAndChek = async () => {
    setLoading(true);
    const dataItem = {
      name: "test",
      value: "test",
    };
    try {
      const res = await apiClient.post("/api/content", dataItem);
      console.log("res", res);
    } catch (e) {
      console.error("Error with key:", e);
    }
    setLoading(false);
    getData();
  };

  useEffect(() => {
    getDataAndChek();
  }, []);

  useEffect(() => {
    if (data?.dataArrBox4_1) {
      setDataArrBox4_1(JSON.parse(data?.dataArrBox4_1 as string));
    }
  }, [data]);

  console.log("data", data);
  console.log("dataArrBox4_1", dataArrBox4_1);

  return (
    <div className="home">
      <div className="home-content">
        <div>
          <Textarea
            id="box1_content_1"
            value={data.box1_content_1 as string}
            onChange={(e) => setData("box1_content_1", e)}
            errors={errors}
            title="Главный баннер"
            styleText={{ fontSize: "28px", height: "60px" }}
          />
          <Textarea
            id="box1_content_2"
            value={data.box1_content_2 as string}
            onChange={(e) => setData("box1_content_2", e)}
            errors={errors}
            // title="Главный баннер"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
        </div>
        <div>
          <Textarea
            id="box2_content_1"
            value={data.box2_content_1 as string}
            onChange={(e) => setData("box2_content_1", e)}
            errors={errors}
            title="Блок №1"
            styleText={{ fontSize: "28px", height: "60px" }}
          />
          <Textarea
            id="box2_content_2"
            value={data.box2_content_2 as string}
            onChange={(e) => setData("box2_content_2", e)}
            errors={errors}
            // title="Главный баннер"
            styleText={{ fontSize: "14px", height: "47px" }}
          />
        </div>
        <div>
          <Textarea
            id="box3_content_1"
            value={data.box3_content_1 as string}
            onChange={(e) => setData("box3_content_1", e)}
            errors={errors}
            title="Блок №2"
            styleText={{ fontSize: "28px", height: "60px" }}
          />
          <Textarea
            id="box3_content_2"
            value={data.box3_content_2 as string}
            onChange={(e) => setData("box3_content_2", e)}
            errors={errors}
            // title="Главный баннер"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
          <Textarea
            id="box3_content_3"
            value={data.box3_content_3 as string}
            onChange={(e) => setData("box3_content_3", e)}
            errors={errors}
            // title="Главный баннер"
            styleText={{ fontSize: "14px", height: "47px" }}
          />
          <Textarea
            id="box3_content_4"
            value={data.box3_content_4 as string}
            onChange={(e) => setData("box3_content_4", e)}
            errors={errors}
            // title="Главный баннер"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
          <Textarea
            id="box3_content_5"
            value={data.box3_content_5 as string}
            onChange={(e) => setData("box3_content_5", e)}
            errors={errors}
            // title="Главный баннер"
            styleText={{ fontSize: "14px", height: "47px" }}
          />
          <Textarea
            id="box3_content_6"
            value={data.box3_content_6 as string}
            onChange={(e) => setData("box3_content_6", e)}
            errors={errors}
            // title="Главный баннер"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
          <Textarea
            id="box3_content_7"
            value={data.box3_content_7 as string}
            onChange={(e) => setData("box3_content_7", e)}
            errors={errors}
            // title="Главный баннер"
            styleText={{ fontSize: "14px", height: "47px" }}
          />
        </div>
        <div>
          <label>Видео</label>
          <main style={{ gridTemplateColumns: "1fr 207px" }}>
            <Textarea
              edit={false}
              id="file_video_content_title_1"
              value={"загрузите видео для плеера (Не более 30мб)"}
              onChange={() => {}}
              // title="Видео"
              styleText={{
                fontSize: "18px",
                height: "60px",
                textTransform: "uppercase",
                paddingBottom: "10px",
                paddingTop: "18px",
              }}
              textInfo={`*Сейчас загружен файл: |#59E991&Видео основное.mp4`}
            />
            <InputFile id="file_video_content_1" onChange={onChangeFile} />
          </main>
        </div>
        <div>
          <Textarea
            id="box4_content_1"
            value={data.box4_content_1 as string}
            onChange={(e) => setData("box4_content_1", e)}
            errors={errors}
            title="Блок №3"
            styleText={{ fontSize: "28px", height: "60px" }}
          />
          <Textarea
            id="box4_content_2"
            value={data.box4_content_2 as string}
            onChange={(e) => setData("box4_content_2", e)}
            errors={errors}
            // title="Главный баннер"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
          <Textarea
            id="box4_content_3"
            value={data.box4_content_3 as string}
            onChange={(e) => setData("box4_content_3", e)}
            errors={errors}
            // title="Главный баннер"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
          <Textarea
            id="box4_content_4"
            value={data.box4_content_4 as string}
            onChange={(e) => setData("box4_content_4", e)}
            errors={errors}
            // title="Главный баннер"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
          <Textarea
            id="box4_content_5"
            value={data.box4_content_5 as string}
            onChange={(e) => setData("box4_content_5", e)}
            errors={errors}
            // title="Главный баннер"
            styleText={{ fontSize: "14px", height: "47px" }}
          />
          <main>
            <div>
              <Textarea
                id="box4_content_6"
                value={data.box4_content_6 as string}
                onChange={(e) => setData("box4_content_6", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "14px", height: "47px" }}
              />
              <Textarea
                id="box4_content_7"
                value={data.box4_content_7 as string}
                onChange={(e) => setData("box4_content_7", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "18px", height: "50px" }}
              />
              <Textarea
                id="box4_content_8"
                value={data.box4_content_8 as string}
                onChange={(e) => setData("box4_content_8", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "28px", height: "60px" }}
              />
              <Textarea
                id="box4_content_9"
                value={data.box4_content_9 as string}
                onChange={(e) => setData("box4_content_9", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "14px", height: "47px" }}
              />
            </div>
            <div>
              <Textarea
                id="box4_content_10"
                value={data.box4_content_10 as string}
                onChange={(e) => setData("box4_content_10", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "14px", height: "47px" }}
              />
              <Textarea
                id="box4_content_11"
                value={data.box4_content_11 as string}
                onChange={(e) => setData("box4_content_11", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "18px", height: "50px" }}
              />
              <Textarea
                id="box4_content_12"
                value={data.box4_content_12 as string}
                onChange={(e) => setData("box4_content_12", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "28px", height: "60px" }}
              />
              <Textarea
                id="box4_content_13"
                value={data.box4_content_13 as string}
                onChange={(e) => setData("box4_content_13", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "14px", height: "47px" }}
              />
            </div>
          </main>
          <main>
            <div>
              <Textarea
                id="box4_content_14"
                value={data.box4_content_14 as string}
                onChange={(e) => setData("box4_content_14", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "14px", height: "47px" }}
              />
              <Textarea
                id="box4_content_15"
                value={data.box4_content_15 as string}
                onChange={(e) => setData("box4_content_15", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "18px", height: "50px" }}
              />
              <Textarea
                id="box4_content_16"
                value={data.box4_content_16 as string}
                onChange={(e) => setData("box4_content_16", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "28px", height: "60px" }}
              />
              <Textarea
                id="box4_content_17"
                value={data.box4_content_17 as string}
                onChange={(e) => setData("box4_content_17", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "14px", height: "47px" }}
              />
            </div>
            <div>
              <Textarea
                id="box4_content_18"
                value={data.box4_content_18 as string}
                onChange={(e) => setData("box4_content_18", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "14px", height: "47px" }}
              />
              <Textarea
                id="box4_content_19"
                value={data.box4_content_19 as string}
                onChange={(e) => setData("box4_content_19", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "18px", height: "50px" }}
              />
              <Textarea
                id="box4_content_20"
                value={data.box4_content_20 as string}
                onChange={(e) => setData("box4_content_20", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "28px", height: "60px" }}
              />
              <Textarea
                id="box4_content_21"
                value={data.box4_content_21 as string}
                onChange={(e) => setData("box4_content_21", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "14px", height: "47px" }}
              />
            </div>
          </main>
          <Textarea
            id="box4_content_22"
            value={data.box4_content_22 as string}
            onChange={(e) => setData("box4_content_22", e)}
            errors={errors}
            // title="Блок №3"
            styleText={{ fontSize: "28px", height: "60px" }}
          />
          <Textarea
            id="box4_content_23"
            value={data.box4_content_23 as string}
            onChange={(e) => setData("box4_content_23", e)}
            errors={errors}
            styleText={{ fontSize: "14px", height: "47px" }}
          />
          <main className="flexPromo">
            <div>
              <Textarea
                id="box4_content_24"
                value={data.box4_content_24 as string}
                onChange={(e) => setData("box4_content_24", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "18px", height: "50px" }}
              />
              <Textarea
                id="box4_content_25"
                value={data.box4_content_25 as string}
                onChange={(e) => setData("box4_content_25", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "28px", height: "60px" }}
              />
              <Textarea
                id="box4_content_28"
                value={data.box4_content_28 as string}
                onChange={(e) => setData("box4_content_28", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "14px", height: "47px" }}
              />
            </div>
            <div>
              <Textarea
                id="box4_content_27"
                value={data.box4_content_27 as string}
                onChange={(e) => setData("box4_content_27", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "18px", height: "50px" }}
              />
              <Textarea
                id="box4_content_29"
                value={data.box4_content_29 as string}
                onChange={(e) => setData("box4_content_29", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "28px", height: "60px" }}
              />
              <Textarea
                id="box4_content_30"
                value={data.box4_content_30 as string}
                onChange={(e) => setData("box4_content_30", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "14px", height: "47px" }}
              />
            </div>
          </main>
          <footer>
            <Textarea
              id="box4_content_31"
              value={data.box4_content_31 as string}
              onChange={(e) => setData("box4_content_31", e)}
              errors={errors}
              // title="Главный баннер"
              styleText={{ fontSize: "14px", height: "47px" }}
            />
            <Textarea
              id="box4_content_32"
              value={data.box4_content_32 as string}
              onChange={(e) => setData("box4_content_32", e)}
              errors={errors}
              // title="Главный баннер"
              styleText={{ fontSize: "14px", height: "47px" }}
            />
            <Textarea
              id="box4_content_33"
              value={data.box4_content_33 as string}
              onChange={(e) => setData("box4_content_33", e)}
              errors={errors}
              // title="Главный баннер"
              styleText={{ fontSize: "14px", height: "47px" }}
            />
            <Textarea
              id="box4_content_34"
              value={data.box4_content_34 as string}
              onChange={(e) => setData("box4_content_34", e)}
              errors={errors}
              // title="Главный баннер"
              styleText={{ fontSize: "14px", height: "47px" }}
            />
          </footer>
          <Textarea
            id="box4_content_35"
            value={data.box4_content_35 as string}
            onChange={(e) => setData("box4_content_35", e)}
            errors={errors}
            styleText={{ fontSize: "14px", height: "47px" }}
          />
          <Textarea
            id="box4_content_36"
            value={data.box4_content_36 as string}
            onChange={(e) => setData("box4_content_36", e)}
            errors={errors}
            styleText={{ fontSize: "28px", height: "60px" }}
          />
          <Textarea
            id="box4_content_37"
            value={data.box4_content_37 as string}
            onChange={(e) => setData("box4_content_37", e)}
            errors={errors}
            styleText={{ fontSize: "14px", height: "35px" }}
          />
          <nav>
            <Textarea
              id="list_1_title"
              value={data.list_1_title as string}
              onChange={(e) => setData("list_1_title", e)}
              errors={errors}
              styleText={{ fontSize: "18px", height: "50px" }}
            />
            <Textarea
              id="list_1_content"
              value={data.list_1_content as string}
              onChange={(e) => setData("list_1_content", e)}
              errors={errors}
              styleText={{
                fontSize: "14px",
                height: "47px",
                textAlign: "start",
              }}
              listMode={true}
            />
          </nav>
          <nav>
            <Textarea
              id="list_2_title"
              value={data.list_2_title as string}
              onChange={(e) => setData("list_2_title", e)}
              errors={errors}
              styleText={{ fontSize: "18px", height: "50px" }}
            />
            <Textarea
              id="list_2_content"
              value={data.list_2_content as string}
              onChange={(e) => setData("list_2_content", e)}
              errors={errors}
              styleText={{
                fontSize: "14px",
                height: "47px",
                textAlign: "start",
              }}
              listMode={true}
            />
          </nav>
          <nav>
            <Textarea
              id="list_3_title"
              value={data.list_3_title as string}
              onChange={(e) => setData("list_3_title", e)}
              errors={errors}
              styleText={{ fontSize: "18px", height: "50px" }}
            />
            <Textarea
              id="list_3_content"
              value={data.list_3_content as string}
              onChange={(e) => setData("list_3_content", e)}
              errors={errors}
              styleText={{
                fontSize: "14px",
                height: "47px",
                textAlign: "start",
              }}
              listMode={true}
            />
          </nav>
        </div>
        <div>
          <Textarea
            id="box4_1_content_1"
            value={data.box4_1_content_1 as string}
            onChange={(e) => setData("box4_1_content_1", e)}
            errors={errors}
            title="Блок №4"
            styleText={{ fontSize: "28px", height: "60px" }}
          />
          <Textarea
            id="box4_1_content_2"
            value={data.box4_1_content_2 as string}
            onChange={(e) => setData("box4_1_content_2", e)}
            errors={errors}
            // title="Блок №3"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
          <Textarea
            id="box4_1_content_3"
            value={data.box4_1_content_3 as string}
            onChange={(e) => setData("box4_1_content_3", e)}
            errors={errors}
            styleText={{ fontSize: "14px", height: "47px" }}
          />
          <Textarea
            id="box4_1_content_1_1"
            value={data.box4_1_content_1_1 as string}
            onChange={(e) => setData("box4_1_content_1_1", e)}
            errors={errors}
            // title="Блок №3"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
          <Textarea
            id="box4_1_content_1_2"
            value={data.box4_1_content_1_2 as string}
            onChange={(e) => setData("box4_1_content_1_2", e)}
            errors={errors}
            // title="Блок №3"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
          <Textarea
            id="box4_1_content_1_3"
            value={data.box4_1_content_1_3 as string}
            onChange={(e) => setData("box4_1_content_1_3", e)}
            errors={errors}
            styleText={{ fontSize: "14px", height: "47px" }}
          />
          <div className="box4-main">
            <div className="content-navigate-box4_1">
              {dataArrBox4_1?.length &&
                dataArrBox4_1?.map((prev, i) => (
                  <div
                    key={i}
                    onClick={() => setSelection(prev?.id)}
                    className={`${
                      prev.id === selection
                        ? "active-content-navigate-box4_1"
                        : ""
                    }`}
                  >
                    <h1>{prev.title}</h1>
                  </div>
                ))}
            </div>

            <div className="content-top-box4_1-1">
              {dataArrBox4_1?.length &&
                dataArrBox4_1
                  .filter((e) => e.id === selection)
                  .map((prev, i) => (
                    <>
                      <div className="content-top-box4_1-1-com-1" key={i}>
                        {prev.content.map((e, i) => (
                          <div key={i}>
                            {/* <h1>{e.title}</h1>
                            <p>
                              {e.price}{" "}
                              <span
                                style={{
                                  fontFamily: `"Segoe UI Variable", "Segoe UI", sans-serif`,
                                }}
                              >
                                ₽
                              </span>
                            </p> */}
                            <InputPages
                              id={`${e.title}_${i}`}
                              onChange={(el) =>
                                onChangeBox4_1("title", el, i, "content")
                              }
                              value={e.title}
                            />
                            <InputPages
                              id={`${e.title}_${i}_${e.price}`}
                              onChange={(el) =>
                                onChangeBox4_1("price", el, i, "content")
                              }
                              value={e.price}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="content-top-box4_1-1-com-2">
                        {prev.subContent.map((e, i) => (
                          <div
                            key={i}
                            className={`content-top-box4_1-1-com-2-${i + 1}`}
                          >
                            <div>
                              <InputPages
                                id={`${e.title}_${i}`}
                                onChange={(el) =>
                                  onChangeBox4_1("title", el, i, "subContent")
                                }
                                value={e.title}
                              />
                              <InputPages
                                id={`${e.title}_${i}_${e.price}`}
                                onChange={(el) =>
                                  onChangeBox4_1("price", el, i, "subContent")
                                }
                                value={e.price}
                              />
                              {/* <h1>{e.title}</h1>
                            <p>
                              {e.price}{" "}
                              <span
                                style={{
                                  fontFamily: `"Segoe UI Variable", "Segoe UI", sans-serif`,
                                }}
                              >
                                ₽
                              </span>
                            </p> */}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ))}
            </div>
          </div>
          <div>
            <Textarea
              id="box4_1_content_2_1"
              value={data.box4_1_content_2_1 as string}
              onChange={(e) => setData("box4_1_content_2_1", e)}
              errors={errors}
              // title="Блок №3"
              styleText={{ fontSize: "28px", height: "60px" }}
            />
            <Textarea
              id="box4_1_content_2_2"
              value={data.box4_1_content_2_2 as string}
              onChange={(e) => setData("box4_1_content_2_2", e)}
              errors={errors}
              styleText={{ fontSize: "14px", height: "47px" }}
            />
          </div>
          <main className="flexPromo">
            <div>
              <Textarea
                id="box4_1_content_4"
                value={data.box4_1_content_4 as string}
                onChange={(e) => setData("box4_1_content_4", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "18px", height: "50px" }}
              />
              <Textarea
                id="box4_1_content_5"
                value={data.box4_1_content_5 as string}
                onChange={(e) => setData("box4_1_content_5", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "28px", height: "60px" }}
              />
              <Textarea
                id="box4_1_content_6"
                value={data.box4_1_content_6 as string}
                onChange={(e) => setData("box4_1_content_6", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "14px", height: "47px" }}
              />
            </div>

            <div>
              <Textarea
                id="box4_1_content_7"
                value={data.box4_1_content_7 as string}
                onChange={(e) => setData("box4_1_content_7", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "18px", height: "50px" }}
              />
              <Textarea
                id="box4_1_content_8"
                value={data.box4_1_content_8 as string}
                onChange={(e) => setData("box4_1_content_8", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "28px", height: "60px" }}
              />
              <Textarea
                id="box4_1_content_9"
                value={data.box4_1_content_9 as string}
                onChange={(e) => setData("box4_1_content_9", e)}
                errors={errors}
                // title="Главный баннер"
                styleText={{ fontSize: "14px", height: "47px" }}
              />
            </div>
          </main>
          <footer>
            <Textarea
              id="box4_1_content_10"
              value={data.box4_1_content_10 as string}
              onChange={(e) => setData("box4_1_content_10", e)}
              errors={errors}
              // title="Главный баннер"
              styleText={{ fontSize: "14px", height: "47px" }}
            />
            <Textarea
              id="box4_1_content_11"
              value={data.box4_1_content_11 as string}
              onChange={(e) => setData("box4_1_content_11", e)}
              errors={errors}
              // title="Главный баннер"
              styleText={{ fontSize: "14px", height: "47px" }}
            />
            <Textarea
              id="box4_1_content_12"
              value={data.box4_1_content_12 as string}
              onChange={(e) => setData("box4_1_content_12", e)}
              errors={errors}
              // title="Главный баннер"
              styleText={{ fontSize: "14px", height: "47px" }}
            />
            <Textarea
              id="box4_1_content_13"
              value={data.box4_1_content_13 as string}
              onChange={(e) => setData("box4_1_content_13", e)}
              errors={errors}
              // title="Главный баннер"
              styleText={{ fontSize: "14px", height: "47px" }}
            />
          </footer>
          <Textarea
            id="box4_1_content_14"
            value={data.box4_1_content_14 as string}
            onChange={(e) => setData("box4_1_content_14", e)}
            errors={errors}
            styleText={{ fontSize: "14px", height: "47px" }}
          />
          {/* <Textarea
            id="box4_1_content_15"
            value={data.box4_1_content_15 as string}
            onChange={(e) => setData("box4_1_content_15", e)}
            errors={errors}
            styleText={{ fontSize: "28px", height: "60px" }}
          />
          <Textarea
            id="box4_1_content_16"
            value={data.box4_1_content_16 as string}
            onChange={(e) => setData("box4_1_content_16", e)}
            errors={errors}
            styleText={{ fontSize: "18px", height: "50px" }}
          /> */}
          <nav>
            <Textarea
              id="list_4_title"
              value={data.list_4_title as string}
              onChange={(e) => setData("list_4_title", e)}
              errors={errors}
              styleText={{ fontSize: "18px", height: "50px" }}
            />
            <Textarea
              id="list_4_content"
              value={data.list_4_content as string}
              onChange={(e) => setData("list_4_content", e)}
              errors={errors}
              styleText={{
                fontSize: "14px",
                height: "47px",
                textAlign: "start",
              }}
              listMode={true}
            />
          </nav>
          <nav>
            <Textarea
              id="list_5_title"
              value={data.list_5_title as string}
              onChange={(e) => setData("list_5_title", e)}
              errors={errors}
              styleText={{ fontSize: "18px", height: "50px" }}
            />
            <Textarea
              id="list_5_content"
              value={data.list_5_content as string}
              onChange={(e) => setData("list_5_content", e)}
              errors={errors}
              styleText={{
                fontSize: "14px",
                height: "47px",
                textAlign: "start",
              }}
              listMode={true}
            />
          </nav>
          <nav>
            <Textarea
              id="list_6_title"
              value={data.list_6_title as string}
              onChange={(e) => setData("list_6_title", e)}
              errors={errors}
              styleText={{ fontSize: "18px", height: "50px" }}
            />
            <Textarea
              id="list_6_content"
              value={data.list_6_content as string}
              onChange={(e) => setData("list_6_content", e)}
              errors={errors}
              styleText={{
                fontSize: "14px",
                height: "47px",
                textAlign: "start",
              }}
              listMode={true}
            />
          </nav>
          <nav>
            <Textarea
              id="list_7_title"
              value={data.list_7_title as string}
              onChange={(e) => setData("list_7_title", e)}
              errors={errors}
              styleText={{ fontSize: "18px", height: "50px" }}
            />
            <Textarea
              id="list_7_content"
              value={data.list_7_content as string}
              onChange={(e) => setData("list_7_content", e)}
              errors={errors}
              styleText={{
                fontSize: "14px",
                height: "47px",
                textAlign: "start",
              }}
              listMode={true}
            />
          </nav>
        </div>
        <div>
          <Textarea
            id="box_mid_1_content_1"
            value={data.box_mid_1_content_1 as string}
            onChange={(e) => setData("box_mid_1_content_1", e)}
            errors={errors}
            title="Блок №5"
            styleText={{ fontSize: "28px", height: "60px" }}
          />
          <Textarea
            id="box_mid_1_content_2"
            value={data.box_mid_1_content_2 as string}
            onChange={(e) => setData("box_mid_1_content_2", e)}
            errors={errors}
            // title="Блок №3"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
          <Textarea
            id="box_mid_1_content_3"
            value={data.box_mid_1_content_3 as string}
            onChange={(e) => setData("box_mid_1_content_3", e)}
            errors={errors}
            styleText={{ fontSize: "14px", height: "47px", textAlign: "start" }}
          />
          {/* <Textarea
            id="box_mid_1_content_4"
            value={data.box_mid_1_content_4 as string}
            onChange={(e) => setData("box_mid_1_content_4", e)}
            errors={errors}
            styleText={{ fontSize: "14px", height: "47px", textAlign: "start" }}
          /> */}
          <main style={{ gridTemplateColumns: "1fr 207px" }}>
            <Textarea
              edit={false}
              id="schema_parking"
              value={"Ознакомиться со схемой"}
              onChange={(e) => setData("schema_parking", e)}
              // title="Видео"
              styleText={{
                fontSize: "14px",
                height: "60px",
                paddingBottom: "10px",
                paddingTop: "20px",
              }}
              textInfo="*Сейчас загружен файл: |#59E991&Прайс-лист на услуги мойки.pdf"
            />
            <InputFile id="schema_parking" onChange={onChangeFile} />
          </main>
        </div>
        <div>
          <Textarea
            id="box_mid_2_content_1"
            value={data.box_mid_2_content_1 as string}
            onChange={(e) => setData("box_mid_2_content_1", e)}
            errors={errors}
            title="Блок №6"
            styleText={{ fontSize: "28px", height: "60px" }}
          />
          <Textarea
            id="box_mid_2_content_2"
            value={data.box_mid_2_content_2 as string}
            onChange={(e) => setData("box_mid_2_content_2", e)}
            errors={errors}
            // title="Блок №3"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
          <Textarea
            id="box_mid_2_content_3"
            value={data.box_mid_2_content_3 as string}
            onChange={(e) => setData("box_mid_2_content_3", e)}
            errors={errors}
            styleText={{ fontSize: "14px", height: "47px" }}
          />
          <Textarea
            id="box_mid_2_content_4"
            value={data.box_mid_2_content_4 as string}
            onChange={(e) => setData("box_mid_2_content_4", e)}
            errors={errors}
            // title="Блок №3"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
          <Textarea
            id="box_mid_2_content_5"
            value={data.box_mid_2_content_5 as string}
            onChange={(e) => setData("box_mid_2_content_5", e)}
            errors={errors}
            styleText={{ fontSize: "14px", height: "47px" }}
          />
          <nav>
            <Textarea
              id="list_8_title"
              value={data.list_8_title as string}
              onChange={(e) => setData("list_8_title", e)}
              errors={errors}
              styleText={{ fontSize: "18px", height: "50px" }}
            />
            <Textarea
              id="list_8_content"
              value={data.list_8_content as string}
              onChange={(e) => setData("list_8_content", e)}
              errors={errors}
              styleText={{
                fontSize: "14px",
                height: "47px",
                textAlign: "start",
              }}
              listMode={true}
            />
          </nav>
          <main style={{ gridTemplateColumns: "1fr 207px" }}>
            <Textarea
              edit={false}
              id="file_content_title_2"
              value={
                "Зоны Hyde Park Tower (R6), Gorky Park Tower (R5), Imperial Park Tower (R4)"
              }
              onChange={(e) => setData("file_content_title_2", e)}
              // title="Видео"
              styleText={{
                fontSize: "14px",
                height: "60px",
                paddingBottom: "10px",
                paddingTop: "20px",
              }}
              textInfo="*Сейчас загружен файл: |#59E991&Прайс-лист на услуги мойки.pdf"
            />
            <InputFile id="file_content_2" onChange={onChangeFile} />
          </main>
          <main style={{ gridTemplateColumns: "1fr 207px" }}>
            <Textarea
              value={"Зоны Regent's Park Tower (R3)"}
              edit={false}
              id="file_content_title_3"
              onChange={(e) => setData("file_content_title_3", e)}
              // title="Видео"
              styleText={{
                fontSize: "14px",
                height: "60px",
                paddingBottom: "10px",
                paddingTop: "20px",
              }}
              textInfo="*Сейчас загружен файл: |#59E991&Прайс-лист на услуги мойки.pdf"
            />
            <InputFile id="file_content_3" onChange={onChangeFile} />
          </main>
          <main style={{ gridTemplateColumns: "1fr 207px" }}>
            <Textarea
              edit={false}
              id="file_content_title_4"
              value={"Зоны Central Park Tower (R7)"}
              onChange={(e) => setData("file_content_title_4", e)}
              // title="Видео"
              styleText={{
                fontSize: "14px",
                height: "60px",
                paddingBottom: "10px",
                paddingTop: "20px",
              }}
              textInfo="*Сейчас загружен файл: |#59E991&Прайс-лист на услуги мойки.pdf"
            />
            <InputFile id="file_content_4" onChange={onChangeFile} />
          </main>
        </div>
        <div>
          <Textarea
            id="box_mid_2_1_content_1"
            value={data.box_mid_2_1_content_1 as string}
            onChange={(e) => setData("box_mid_2_1_content_1", e)}
            errors={errors}
            title="Блок №7"
            styleText={{ fontSize: "28px", height: "60px" }}
          />
          <Textarea
            id="box_mid_2_1_content_2"
            value={data.box_mid_2_1_content_2 as string}
            onChange={(e) => setData("box_mid_2_1_content_2", e)}
            errors={errors}
            // title="Блок №3"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
          <Textarea
            id="box_mid_2_1_content_3"
            value={data.box_mid_2_1_content_3 as string}
            onChange={(e) => setData("box_mid_2_1_content_3", e)}
            errors={errors}
            styleText={{ fontSize: "14px", height: "47px" }}
          />
        </div>
        {/* <div>
          <Textarea
            id="box5_content_1"
            value={data.box5_content_1 as string}
            onChange={(e) => setData("box5_content_1", e)}
            errors={errors}
            title="Блок №8"
            styleText={{ fontSize: "28px", height: "60px" }}
          />
          <main>
            <div>
              <Textarea
                id="box5_content_2"
                value={data.box5_content_2 as string}
                onChange={(e) => setData("box5_content_2", e)}
                errors={errors}
                // title="Блок №3"
                styleText={{ fontSize: "18px", height: "50px" }}
              />
              <Textarea
                id="box5_content_3"
                value={data.box5_content_3 as string}
                onChange={(e) => setData("box5_content_3", e)}
                errors={errors}
                styleText={{ fontSize: "14px", height: "47px" }}
              />
            </div>
            <div>
              <Textarea
                id="box5_content_4"
                value={data.box5_content_4 as string}
                onChange={(e) => setData("box5_content_4", e)}
                errors={errors}
                // title="Блок №3"
                styleText={{ fontSize: "18px", height: "50px" }}
              />
              <Textarea
                id="box5_content_5"
                value={data.box5_content_5 as string}
                onChange={(e) => setData("box5_content_5", e)}
                errors={errors}
                styleText={{ fontSize: "14px", height: "47px" }}
              />
            </div>
          </main>
        </div> */}
      </div>
      <button
        className={`button-save ${loading ? "button-save-active" : ""}`}
        onClick={() => {
          if (!loading) {
            onSend();
          }
        }}
      >
        <div></div>
        {loading ? (
          <main>Loading</main>
        ) : (
          <h1>
            Сохранить <br />
            изменения
          </h1>
        )}
      </button>
    </div>
  );
}
