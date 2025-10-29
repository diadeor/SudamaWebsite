const errorHandle = async (err, req, res, next) => {
  console.log(err);
  try {
    res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
    });
  } catch (error) {
    console.error("Error in error middleware:", error.message);
    res.status(error.statusCode || 500).send("Internal server error while handling another error");
  }
};

export default errorHandle;
