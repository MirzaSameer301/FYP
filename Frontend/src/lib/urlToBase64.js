export const urlToBase64 = async (url) => {
  if (!url) return null;

  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // base64 string
    reader.readAsDataURL(blob);
  });
};
