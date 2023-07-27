import { HandlerContext } from "$fresh/server.ts";
import { ShortcodeStore } from "@/lib/shortcode.ts";

// export default function Greet(props: PageProps) {
//   return <div>Hello {props.params.slug}</div>;
// }

export const handler = {
  async GET(_req: Request, ctx: HandlerContext) {
    const slug = encodeURIComponent(ctx.params.slug)
    console.log(slug);

    const kv = await Deno.openKv();
    const res = await kv.get(["links", slug]);
    if (res.value) {
      const resp = new Response(null, {
        status: 302
      });
      resp.headers.set("Location", (res.value as ShortcodeStore).url || "");
      return resp;
    }

    return new Response(null, { status: 404 });
  }
}
