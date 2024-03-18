import { AdminMenuList } from "./AdminMenuList"

const url ='/admin/dashboard'

const menu = [
    {
        href: `${url}/giveway`,
        label: 'Crear Sorteo',
    },
    {
        href: `${url}/giveways/all`,
        label: 'Sorteos',
    },
    {
        href: `${url}/users`,
        label: 'Usuarios',
    },
   
   
]

export const AdminAside = () => {


    return (
        <aside className="bg-violet-600/10 -translate-x-80 fixed inset-0 mt-14 z-0 h-full w-40  transition-transform duration-300 xl:translate-x-0">
            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1">
                    {
                        menu.map(({ label, href }) => (
                            <li key={label}>
                                <AdminMenuList label={label} href={href} />
                            </li>
                        ))
                    }

                </ul>

            </div>
        </aside>
    )
}