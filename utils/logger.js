const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema(
  {
    level: String,
    message: String,
    meta: Object,
    timestamp:Date,
  },
  { timestamps: true, versionKey: false }
);


// Log modelini oluşturun
const LogModel = mongoose.model('Log', LogSchema);
const ErrorLogModel = mongoose.model(
    'ErrorLog',
    new mongoose.Schema(LogSchema.obj, { collection: 'error_logs',timestamps:true,versionKey:false })
  );
  
  const WarnLogModel = mongoose.model(
    'WarnLog',
    new mongoose.Schema(LogSchema.obj, { collection: 'warn_logs',timestamps:true,versionKey:false  })
  );
const saveLogToMongoDB = async (level, message, meta) => {
  try {
    let logModel;

    switch (level) {
      case 'info':
        logModel = LogModel;
        break;
      case 'error':
        logModel = ErrorLogModel;
        break;
      case 'warn':
        logModel = WarnLogModel;
        break;
      default:
        logModel = LogModel;
    }
    const logData = {
      level,
      message,
      meta,
      timestamp: new Date().toISOString(),
    };

    const log = new logModel(logData);
    await log.save();
  } catch (error) {
    console.error('Log kaydetme hatası:', error);
  }
};

module.exports = { saveLogToMongoDB };
