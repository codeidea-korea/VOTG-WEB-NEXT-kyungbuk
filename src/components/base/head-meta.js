import Head from 'next/head'

const HeadMeta = ({ title, description, url, image }) => {
    return (
        <Head>
            <title>{`${title} - 뷰즈온더고 :: Views On the Go` || '뷰즈온더고 :: Views On the Go'}</title>
            <meta name="description" content={description || '로코모션뷰는 학술기반 설문조사 설계를 전문적으로 연구하는 전문가들이, 쉽고 간단하게 온라인에서 이용하는 서비스를 제공하는 플랫폼입니다.'} />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta property="og:title" content={title || '뷰즈온더고 :: Views On the Go'} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || process.env.NEXT_PUBLIC_HOST} />
            <meta property="og:image" content={image || '/site/viewonthego_site_thumbnail.png'} />
            <meta property="og:article:author" content="뷰즈온더고" />
        </Head>
    )
}

export default HeadMeta