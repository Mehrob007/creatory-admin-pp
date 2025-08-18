"use client";
import Textarea from "@/components/element-tags/Textarea";
import { useFormStore } from "@/hooks/useFormStore";
import { apiClient } from "@/utils/apiClient";
import { arrKeysService } from "@/keys";
import React, { useEffect, useState } from "react";
import InputFile from "@/components/element-tags/InputFile";

export default function Service() {
  const { data, errors, setData } = useFormStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [haveKeys, setHaveKeys] = useState<string[]>([""]);

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
    sendSequentialRequests();
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
    await arrKeysService.map(async (e) => {
      const dataName = await getItems(e);
      haveKeysData.push(dataName);
    });
    setHaveKeys(haveKeysData);
  };
  const onChangeFile = async (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<boolean> => {
    try {
      const data = new FormData();
      data.append("key", key);
      data.append("file", e?.target?.files?.[0] as File);
      const res = await apiClient.post("api/files", data);
      return !!res as boolean;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="home">
      <div className="home-content">
        <div>
          <Textarea
            id="service_content_1"
            value={data.service_content_1 as string}
            onChange={(e) => setData("service_content_1", e)}
            errors={errors}
            title="Блок №1"
            styleText={{ fontSize: "18px", height: "50px" }}
          />
          <Textarea
            id="service_content_2"
            value={data.service_content_2 as string}
            onChange={(e) => setData("service_content_2", e)}
            errors={errors}
            styleText={{ fontSize: "28px", height: "60px" }}
          />
          <Textarea
            id="service_content_3"
            value={data.service_content_3 as string}
            onChange={(e) => setData("service_content_3", e)}
            errors={errors}
            styleText={{ fontSize: "14px", height: "60px", textAlign: "start" }}
          />
          <main style={{ gridTemplateColumns: "1fr 207px" }}>
            <Textarea
              value={"Прайс-лист на услуги мойки"}
              edit={false}
              id="service_file_content_title_1"
              onChange={(e) => setData("service_file_content_title_1", e)}
              // title="Видео"
              styleText={{
                fontSize: "18px",
                height: "60px",
                paddingBottom: "10px",
                paddingTop: "18px",
              }}
              textInfo="*Сейчас загружен файл: |#59E991&Прайс-лист на услуги мойки.pdf"
            />
            <InputFile id="service_file_content_1" onChange={onChangeFile} />
          </main>
        </div>
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
