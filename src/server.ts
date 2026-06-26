import { app } from "./shared/infra/webserver/app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`http server running on http://localhost:${PORT}`);
});
