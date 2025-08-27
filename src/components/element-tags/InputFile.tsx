import React, { useEffect, useState } from "react";

interface InputFile {
  id: string;
  onChange: (
    key: string,
    e?: React.ChangeEvent<HTMLInputElement>
  ) => Promise<false | { res: boolean; data: string }>;
}

export default function InputFile({ id, onChange }: InputFile) {
  const [loading, setLoading] = useState(false);
  const [nameFile, setNameFile] = useState<string>("");

  const sendReq = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const resData = await onChange(id, e);
    if (!resData) return;
    const { res, data } = resData;
    console.log("file", res);
    setNameFile(data);
    setLoading(!res);
  };

  useEffect(() => {
    const getFile = async () => {
      const resData = await onChange(id);
      if (!resData) return;
      const { data } = resData;
      setNameFile(data);
    };
    getFile();
  }, []);

  return (
    <>
      <label
        htmlFor={!loading ? `file-${id}` : ""}
        className={`input-file ${loading ? "active-loading" : ""}`}
      >
        загрузить файл
        <input
          type="file"
          id={`file-${id}`}
          onChange={(e) => {
            if (!loading) sendReq(e);
          }}
        />
      </label>
      <p className="file-name">{nameFile}</p>
    </>
  );
}
