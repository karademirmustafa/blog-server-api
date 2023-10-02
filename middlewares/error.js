const ErrorResponse = require("../utils/errorResponse");
const { saveLogToMongoDB } = require("../utils/logger");

const errorHandler = (err, req, res, next) => {

  let storageData = {};
  const startTime = new Date(); // Start time for measuring response time

  const originalSend = res.send;
  res.send = function (data) {
    storageData.response = data;
    originalSend.call(this, data);
  };
  res.on('finish', () => {
    const statusCode = res.statusCode;
    const contentType = res.get('Content-Type');
    // Calculate response time
    const endTime = new Date();
    const responseTime = endTime - startTime;
    const ipAddress = req.headers['cf-connecting-ip'];
    const method = req.method;
    const action = req.path;
    const body = req.body;
    const params = req.params;
    const query = req.query;
    const headers = req?.headers;
    const file = req?.file;
    const user = req?.user;
    const date = new Date();
    const fullPath = req?.originalUrl;
    const level = "error";
    const message = err.name;
    const meta = {
      error: err,
      stack: err.stack,
      ipAddress,
      fullPath,
      method,
      action,
      body,
      params,
      query,
      headers,
      file,
      statusCode,
      contentType,
      response: storageData?.response ? JSON.parse(storageData?.response) : null,
      user: user ? user._doc : null,
      userId: user?._id ?? null,
      date,
      responseTime,
    }
    saveLogToMongoDB(level, message, meta)

    next()
  });
  let error = { ...err };

  error.message = err.message;

  if (err.code === 11000) {
    const message = `You entered a duplicate value. Please try again`;

    error = new ErrorResponse(message, 409);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => {
      val.message;
    });
    error = new ErrorResponse(message, 400);
  }

  // if (err instanceof CastError) {
  //   error = new ErrorResponse("Geçersiz parametre değeri.", 400);
  // }
  // if (err instanceof PopulateError) {
  //   error = new ErrorResponse("Populate hatası.", 500);
  // }
  // if (err instanceof Error && err.status === 404) {
  //   error = new ErrorResponse("İstek yapılan kaynak bulunamadı.", 404);
  // }
  // if (err instanceof QueryError) {
  //   error = new ErrorResponse("Sorgu hatası.", 400);
  // }

  // if (err instanceof MongoError && err.code === 16837) {
  //   error = new ErrorResponse("Geçersiz güncelleme parametresi.", 400);
  // }
  // if (err instanceof ConnectionError) {
  //   error = new ErrorResponse("Veritabanı bağlantısı hatası.", 500);
  // }
  // if (err instanceof MiddlewareError) {
  //   error = new ErrorResponse("Middleware hatası.", 500);
  // }
  // if (err instanceof MongoDriverError) {
  //   error = new ErrorResponse("MongoDB sürücü hatası.", 500);
  // }
  // if (err instanceof JsonWebTokenError) {
  //   error = new ErrorResponse("Geçersiz oturum açma bilgileri.", 401);
  // }
  // if (err instanceof TypeError) {
  //   error = new ErrorResponse("Yanlış türde veri kullanıldı.", 400);
  // }
  // console.log(err.stack) // bizim için
  res.status(error.statusCode || 500).json({
    status: false,
    message: error.message || "Server Error",
    data: null,

  });
};

module.exports = errorHandler;
