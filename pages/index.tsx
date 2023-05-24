import DragAndDropArea from "@/components/DragAndDropArea";
import Carousel from "@/components/Carousel";
import Drawer from "@/components/Drawer";
import Board from "@/components/Board";
import Billboard from "@/components/Billboard";

export default function Home() {
  return (
    <>
      <Billboard />
      <Board />
      <Carousel />
      <h1 className="text-center">Trainees Messages</h1>
      <Drawer />
    </>
  );
}
