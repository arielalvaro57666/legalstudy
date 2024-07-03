import Sidebar from "@/app/_components/admin/sidebar/sidebar";

export default function Layout({children}:{children: React.ReactNode}) 
{
    return (
        <>
            <Sidebar/>
            <section className="bg-[#222] w-screen h-screen lg:p-2">
                <section className="bg-[#1a150f] w-full h-full rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
                    {children}
                </section>
            </section>
        </>
    )
}
