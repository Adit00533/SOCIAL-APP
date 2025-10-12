export const handleMediaUpload = (req) => {
  if (!req.file) {
    return {
      status: 400,
      body: { success: false, message: "No file uploaded ❌" },
    };
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  return {
    status: 201,
    body: {
      success: true,
      message: "File uploaded successfully 📤",
      url: fileUrl,
    },
  };
};
