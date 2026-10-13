import { renderToString } from "react-dom/server";
import { Site } from "./Site";
export function render(pathname: string) {
  return renderToString(<Site pathname={pathname} />);
}
