import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/index.tsx"),
    route("playlist/:playlistId", "routes/playlist.tsx"),
    route("playlist/:playlistId/:songId/", "routes/resources/song.tsx"),
  ]),
] satisfies RouteConfig;
