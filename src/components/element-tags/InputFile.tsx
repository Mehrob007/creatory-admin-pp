import React, { useState } from "react";

interface InputFile {
  id: string;
  onChange: (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<boolean>;
}

export default function InputFile({ id, onChange }: InputFile) {
  const [loading, setLoading] = useState(false);

  const sendReq = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const res = await onChange(id, e);
    setLoading(!res);
  };

  return (
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
  );
}
