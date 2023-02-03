export const AboutPage: React.FC = () => {
    return (
        <div id="about-page" className="bg-neutral-200 h-full flex justify-center items-center">
            <div id="about-card" className="bg-white w-2/3 h-8/12 rounded-lg shadow-lg py-6 px-20 flex flex-col justify-between">
                <h1 className="text-gray-900 text-3xl leading-tight font-bold py-4 text-center bg-white shadow-md mb-8 rounded-lg">What's the Point?</h1>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    The goal of this platform is to make it easier and more efficient to read and comprehend PDFs. The idea was born when I began reading complex computer science and AI research papers. While learning more about AI, I wanted to leverage AI to help me learn more, faster.
                </p>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    Utilizing the latest advancements in deep learning transformer architecture, natural language processing, and cloud-based technology, this platform automatically summarizes PDFs with remarkable accuracy and speed. Simply upload your PDF and receive a concise, easily digestible summary in no time.
                </p>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    In the future, I hope this site will be used as a tool to help people learn. Ideally, this platform could be a library of knowledge - providing the cliff notes for revolutionary research papers, especially in the realm of computer science. 
                </p>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    Thanks for visiting!
                </p>
                <p className="text-lg font-bold leading-relaxed mt-0 mb-8 text-gray-800 text-right">- Jacob Danner</p>
            </div>
        </div>
    )
}