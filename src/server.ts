import app from './app';
const PORT = process.env.PORT || 8080;

app.listen(PORT, (): void => {
  console.log(`Example app listening on port ${PORT}`);
});
