import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionCache from "../Components/Hooks/CreateEmotionCache";
import createEmotionServer from '@emotion/server/create-instance';
import { createAppTheme } from "../Styles/AppTheme";

// https://github.com/mui/material-ui/blob/master/examples/nextjs/pages/_document.js
class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name="theme-color" content={createAppTheme().palette.primary.main} />
                    <meta charSet="utf-8" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /> 
                    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;700&display=swap" rel="stylesheet" />
                    {
                        // Inject MUI styles first to match with the prepend: true configuration
                        // @ts-ignore
                        this.props.emotionStyleTags
                    }
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

CustomDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () => (
        originalRenderPage({
            enhanceApp: (App) =>
                function EnhanceApp(props) {
                    // @ts-ignore
                    return <App emotionCache={cache} {...props} />;
                },
        })
    );

    const initialProps = await Document.getInitialProps(ctx);

    // This is important. It prevents emotion from rendering invalid HTML.
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
}

export default CustomDocument;