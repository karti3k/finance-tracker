import Image from "next/image";
import ProfilePic from '@/app/assets/ProfilePic.png';
import { ImStatsBars } from "react-icons/im";
function Nav(){
    return (
        <header className="max-w-5xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User profile */}
        <div className="flex items-center gap-2">
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            {/* image */}
            <Image src={ProfilePic} alt="Profile Picture" className="w-full h-full object-cover"></Image>
          </div>
          {/* name */}
          <small>Hi, Kartik!</small>

        </div>

        {/* Right side of the naviagation */}
        <nav className="flex items-center gap-2">
          <div><ImStatsBars className="text-2xl" /></div>
          <div><button className="btn btn-danger">Sign Out</button></div>
        </nav>
      </div>
    </header>
    );
}
export default Nav;