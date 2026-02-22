import { Response } from "express";

const handleResponse = (
  res: Response,
  status: number,
  data: any = null,
  message: string = "",
) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export default handleResponse;
