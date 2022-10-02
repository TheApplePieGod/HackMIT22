
import React from 'react';
import {useEffect, useRef} from 'react'
import {Button} from "@mui/material"
import { ForceGraph2D } from 'react-force-graph';

const NoteForceGraph = () => {

  const graphRef = useRef();

  const myData = {
    "nodes": [ 
        { 
          "id": "id1",
          "name": "This is a very long note name that is extemely long and wordy",
          "val": 1 
        },
        { 
          "id": "id2",
          "name": "name2",
          "val": 10 
        },
        { 
          "id": "id3",
          "name": "name3",
          "val": 10 
        },
        { 
          "id": "id4",
          "name": "name4",
          "val": 10 
        },
        { 
          "id": "id5",
          "name": "Another cool note thing",
          "val": 10 
        },
        { 
          "id": "id5",
          "name": "Another cool note thing",
          "val": 10 
        },
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2"
        },
        {
          "source": "id2",
          "target": "id3"
        },
        {
          "source": "id4",
          "target": "id3"
        },
        {
          "source": "id4",
          "target": "id1"
        },
        {
          "source": "id4",
          "target": "id5"
        },
    ]
  }

  const wrap_size = 0

  const wrapText = (string, width, ctx) => {
    const words = string.split(' ');
    const lines = [];
    let maxWidth = 0;
    
    let buffer = ""
    for(let i=0; i < words.length; i++){
      const word = words[i];
      let newBuffer = buffer + " " + word
      if(i == words.length - 1) {
        lines.push(newBuffer)
        const newWidth = ctx.measureText(newBuffer).width;
        if(newWidth > maxWidth) maxWidth = newWidth;
      }
      else if(ctx.measureText(newBuffer).width > width) {
        lines.push(buffer);
        const newWidth = ctx.measureText(buffer).width;
        if(newWidth > width) maxWidth = newWidth;
        buffer = word;
      }
      else buffer = newBuffer;
    }
    
    return {lines, maxWidth};
  }

  const nodeCanvasObject = (node, ctx, globalScale) => {
    const fontSize = 12;
    ctx.font = `${fontSize}px Sans-Serif`;
    const wrappedText = wrapText(node.name, 100, ctx)
    const textWidth = wrappedText.maxWidth;
    const textHeight = fontSize * wrappedText.lines.length;
    
    const radius = Math.max(textWidth, textHeight) * 0.8
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgb(0, 0, 0)';

    wrappedText.lines.forEach((line, i) => ctx.fillText(line, node.x, node.y - (textHeight / 2) + fontSize * i + fontSize / 2))
    node.bckgRadius = wrappedText.maxWidth;
  }

  const nodePointerAreaPaint = (node, color, ctx) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.bckgRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
  }

  return (
    <div>
      <Button 
        onClick={() => {
          graphRef.current.zoomToFit(300, 300, node => node.id == "id1")
          graphRef.current.d3Force('link').distance(link => 200)
        }}>
        Click
      </Button>
      <ForceGraph2D
        ref={graphRef}
        graphData={myData}
        nodeCanvasObject={nodeCanvasObject}
        nodePointerAreaPaint={nodePointerAreaPaint}
        nodeRelSize={20}
        linkColor={() => "#222222"}
        linkDirectionalArrowLength={20}
        linkDirectionalArrowRelPos={1}
        linkWidth={5}
        onNodeClick={(node) => {console.log(node)}}
        cooldownTicks={100}
      />
    </div>
  );
}

export default NoteForceGraph;