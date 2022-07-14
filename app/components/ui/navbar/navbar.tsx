import { Menu, Github } from '~/icons';
import { links } from './navbar.constants';

export const Navbar = () => {
	return (
		<nav className="relative flex flex-wrap items-center justify-between text-white bg-primary lg:flex-nowrap">
			<label htmlFor="menu-checkbox" className="block p-4 lg:hidden">
				<Menu />
				<span className="absolute w-0 h-0 -m-1 overflow-hidden">Menu Toggler</span>
			</label>

			<input type="checkbox" id="menu-checkbox" className="hidden peer" />

			<ul className="flex flex-col items-start order-2 w-full h-0 text-primary bg-white shadow-lg opacity-0 pointer-events-none lg:flex-row lg:order-[0] lg:bg-transparent lg:text-white lg:w-max lg:h-full lg:items-center lg:shadow-none lg:opacity-100 lg:pointer-events-auto peer-checked:opacity-100 peer-checked:pointer-events-auto peer-checked:h-full">
				<li className="hidden lg:block">
					<a href="https://www.realdevsquad.com" className="block px-4 py-2 ">
						<img
							src="/icons/Real-Dev-Squad@1x.png"
							alt="Real dev squad logo"
							className="w-[50px] h-[50px]"
						/>
					</a>
				</li>

				{links.map((i) => (
					<li key={i.name} className="last:mb-4 lg:last:m-0">
						<a
							href={`https://${i.href}`}
							className="block px-4 py-3 mx-2 font-medium capitalize lg:py-4 lg:p-4 hover:text-lime-green"
						>
							{i.name}
						</a>
					</li>
				))}
			</ul>

			<a
				href="https://github.realdevsquad.com"
				className="flex items-center px-4 py-1 mx-4 border border-white rounded "
			>
				<span>Sign In with Github</span>
				<Github className="ml-2 fill-white" width={20} height={20} />
			</a>
		</nav>
	);
};
