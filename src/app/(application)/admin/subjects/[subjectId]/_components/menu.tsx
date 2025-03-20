import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const views = [
  { name: "Overview", slug: "overview" },
  { name: "Attendance", slug: "attendance" },
  { name: "Tests", slug: "tests" },
];

const Menu = () => {
  return (
    <Tabs defaultValue="overview" className="min-h-screen w-full">
      <TabsList>
        {views.map((view) => (
          <TabsTrigger key={view.slug} value={view.slug}>
            {view.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="overview">
        <Card className="">
          <CardContent></CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="attendance">
        <Card className="">
          <CardContent></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tests">
        <Card className="">
          <CardContent></CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Menu;
// import { useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
//
// const menuItems = [
//   { name: "Overview" },
//   { name: "About" },
//   { name: "Services" },
//   { name: "Contact" },
// ];
//
// type MenuProps = {
//   value?: string;
//   onChange?: (value: string) => void;
// };
//
// const Menu = ({ value, onChange }: MenuProps) => {
//   const [selected, setSelected] = useState(value ?? menuItems[0]?.name);
//
//   const handleClick = (name: string) => {
//     setSelected(name);
//     onChange?.(name);
//   };
//
//   return (
//     <nav className="flex gap-1">
//       {menuItems.map(({ name, href }) => (
//         <Button
//           key={name}
//           variant={selected === name ? "menuActive" : "ghost"}
//           className=""
//           onClick={(e) => {
//             e.preventDefault();
//             handleClick(name);
//           }}
//         >
//           {name}
//         </Button>
//       ))}
//     </nav>
//   );
// };
//
// export default Menu;
