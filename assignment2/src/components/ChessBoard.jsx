import { ROW, COL } from "../data/constants";
import { useState } from "react";
import knightIcon from "../assets/chess-knight-icon.webp";

function ChessBoard() {
  //set curPos = [posX, posY]
  let [curPos, setPos] = useState(() => [-1, -1]);
  let [curColor, setCurColor] = useState(() => "");
  let [valPos, setValPos] = useState(() => [[-1, -1]]);
  let [valPosCol, setValPosCol] = useState(() => [""]);

  function getCurPos(e) {
    if (curPos[0] !== -1) {
      document.querySelectorAll(`[data-posy='${curPos[1]}']`)[
        curPos[0] - 1
      ].style.backgroundColor = curColor;
      document.querySelectorAll(`[data-posy='${curPos[1]}']`)[
        curPos[0] - 1
      ].style.backgroundImage = "";
    }

    let tmpCol = getComputedStyle(
      document.querySelectorAll(`[data-posy='${e.target.dataset.posy}']`)[
        Number(e.target.dataset.posx) - 1
      ]
    )["background-color"];

    if (tmpCol === "rgb(255, 0, 0)" || tmpCol === "rgb(255, 0, 0)") {
      let j = 0;
      for (; j < valPos.length; j++) {
        if (
          valPos[j][0] === Number(e.target.dataset.posx) &&
          valPos[j][1] === Number(e.target.dataset.posy)
        )
          break;
      }
      setCurColor(valPosCol[j]);
    } else {
      setCurColor(
        getComputedStyle(
          document.querySelectorAll(`[data-posy='${e.target.dataset.posy}']`)[
            Number(e.target.dataset.posx) - 1
          ]
        )["background-color"]
      );
    }

    document.querySelectorAll(`[data-posy='${e.target.dataset.posy}']`)[
      Number(e.target.dataset.posx) - 1
    ].style.backgroundColor = "#aa00ff";
    document.querySelectorAll(`[data-posy='${e.target.dataset.posy}']`)[
      Number(e.target.dataset.posx) - 1
    ].style.backgroundImage = `url(${knightIcon})`;
    document.querySelectorAll(`[data-posy='${e.target.dataset.posy}']`)[
      Number(e.target.dataset.posx) - 1
    ].style.backgroundSize = "3.1rem";
    document.querySelectorAll(`[data-posy='${e.target.dataset.posy}']`)[
      Number(e.target.dataset.posx) - 1
    ].style.backgroundPosition = "50%";
    document.querySelectorAll(`[data-posy='${e.target.dataset.posy}']`)[
      Number(e.target.dataset.posx) - 1
    ].style.backgroundRepeat = "no-repeat";

    setPos([Number(e.target.dataset.posx), Number(e.target.dataset.posy)]);

    getValPos(Number(e.target.dataset.posx), Number(e.target.dataset.posy));
  }

  function getValPos(posx, posy) {
    let pos = [];
    let col = [];

    if (posx - 1 > 0 && posy - 2 > 0) pos.push([posx - 1, posy - 2]);
    if (posx - 1 > 0 && posy + 2 <= ROW) pos.push([posx - 1, posy + 2]);
    if (posx + 1 <= COL && posy - 2 > 0) pos.push([posx + 1, posy - 2]);
    if (posx + 1 <= COL && posy + 2 <= ROW) pos.push([posx + 1, posy + 2]);
    if (posx - 2 > 0 && posy - 1 > 0) pos.push([posx - 2, posy - 1]);
    if (posx + 2 <= COL && posy - 1 > 0) pos.push([posx + 2, posy - 1]);
    if (posx - 2 > 0 && posy + 1 <= ROW) pos.push([posx - 2, posy + 1]);
    if (posx + 2 <= COL && posy + 1 <= ROW) pos.push([posx + 2, posy + 1]);

    setValPos(pos);

    if (valPosCol[0] !== "") {
      for (let i = 0; i < valPos.length; i++) {
        if (!(posx === valPos[i][0] && posy === valPos[i][1])) {
          document.querySelectorAll(`[data-posy='${valPos[i][1]}']`)[
            valPos[i][0] - 1
          ].style.backgroundColor = valPosCol[i];
        }
      }
    }

    for (let i = 0; i < pos.length; i++) {
      col.push(
        getComputedStyle(
          document.querySelectorAll(`[data-posy='${pos[i][1]}']`)[pos[i][0] - 1]
        )["background-color"]
      );
    }

    setValPosCol(col);

    for (let i = 0; i < pos.length; i++) {
      document.querySelectorAll(`[data-posy='${pos[i][1]}']`)[
        pos[i][0] - 1
      ].style.backgroundColor = "red";
    }
  }

  function createRowCol(row, col) {
    let table = [];
    for (let i = 0; i < row; i++) {
      let cols = [];
      for (let j = 0; j < col; j++)
        cols.push(
          <td
            key={j}
            data-posx={j + 1}
            data-posy={i + 1}
            onClick={getCurPos}
            className={`border border-solid border-black
             group-even:odd:bg-black group-odd:even:bg-black
             hover:cursor-pointer
            w-20 h-20`}
          ></td>
        );
      table.push(
        <tr className="group" key={i}>
          {cols}
        </tr>
      );
    }
    return table;
  }

  return (
    <>
      <table
        className={`border-separate inline-block min-w-0 aspect-square
      bg-gradient-to-tl from-[#1da1f2] to-[#0039a6]`}
      >
        <tbody>{createRowCol(ROW, COL)}</tbody>
      </table>
    </>
  );
}

export default ChessBoard;
