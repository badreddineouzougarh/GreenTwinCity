import Head from 'next/head';
import dynamic from 'next/dynamic';
import '../public/cesium/Widgets/widgets.css';  // Assurez-vous que le chemin est correct

const Cesium = dynamic(
    () => import('../components/Cesiumviewer'), // Assurez-vous que le chemin et le nom du fichier sont corrects
    { ssr: false } // Ne pas rendre côté serveur
);

export default function Home() {
    return (
        <div>
            <Head>
                <title>Cesium in Next.js</title>
                <link rel="stylesheet" href="/cesium/Widgets/widgets.css" />
            </Head>
            <Cesium />
        </div>
    );
}
