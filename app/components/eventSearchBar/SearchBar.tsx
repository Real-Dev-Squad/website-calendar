

export default function SearchBar() {
    return (
        <>

            <form action="" className="flex justify-center bg-gray-100 rounded-xl border-2 overflow-hidden w-80 m-2">
            <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto text-gray-400 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                   </button>
                <input type="search" placeholder="Search Events" className="block rounded-md border-0 flex-grow p-2 bg-gray-100" />
            </form>

        </>
    )
}


