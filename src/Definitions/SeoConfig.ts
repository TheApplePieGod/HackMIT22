const SITE_NAME = "App"
const DESCRIPTION = "HackMIT 2022"
//const BASE_URL = "https://example.com";

// https://github.com/garmeeh/next-seo#setup
export default {
    title: SITE_NAME,
    description: DESCRIPTION,
    //canonical: BASE_URL,
    openGraph: {
        //url: "https://www.url.ie/a",
        title: SITE_NAME,
        description: DESCRIPTION,
        images: [
            {
                url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ffc09.deviantart.net%2Ffs71%2Fi%2F2010%2F218%2F5%2Ff%2FGeneric_Background_by_transylvaniandreams.png&f=1&nofb=1",
                width: 900,
                height: 504,
                alt: "Generic background image",
                type: "image/png",
            },
        ],
        site_name: SITE_NAME
    },
    twitter: {
        cardType: "summary_large_image"
    }
};