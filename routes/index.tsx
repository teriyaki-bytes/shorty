import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Shortener from "../islands/Shortener.tsx";

import { Handlers, PageProps } from "$fresh/server.ts";
import { generateShortcode } from "../lib/shortcode.ts";

interface Data {
  shortCode?: string
}



export const handler: Handlers<Data> = {
  async POST(req, ctx) {
    const form = await req.formData()
    if (!form.has("s")) {
      return new Response(null, {
        status: 400
      })
    }

    const url = form.get("s")!.toString();
    let shortCode = "";
    // https://deno.land/manual@v1.35.0/runtime/kv
    const kv = await Deno.openKv();
    const res = await kv.get(["links", url]);
    if (res.value) {
      shortCode = (res.value as Data).shortCode!;
    } else {
      shortCode = generateShortcode(12);
      await kv.set(["links", url], { shortCode })
      await kv.set(["links", shortCode], { url })

    }

    return ctx.render({ shortCode });

  }
}

export default function Home({ data }: PageProps<Data>) {
  const count = useSignal(3);
  return (
    <>
      <Head>
        <title>Shorty</title>
        <meta name="description" content="A litle portable URL shortener" />
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <a href="/"><h1 class="text-6xl text-center font-bold">Shorty</h1></a>
        <p class="my-6">
          Shorty is a small portable url shortener designed for Deno Deploy. You can run it anywhere of course, but Shorty
          takes advantage of Deploy's strengths to make it portable, quick, and dependable.
        </p>
        {(data !== undefined) ? (
          <Shortener display={data.shortCode} />
        ) : (
          <Shortener />
        )}

      </div>
    </>
  );
}
