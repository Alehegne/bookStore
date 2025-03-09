"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [serverResponse, setServerResponse] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((data) => setServerResponse(data.data))
      .catch((error) => setServerResponse(`error-${error}`));
  });
  return <div>{serverResponse}</div>;
}
