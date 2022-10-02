import React from 'react';
import {useEffect, useRef} from 'react'
import {Button} from "@mui/material"
import { ForceGraph2D } from 'react-force-graph';
import { notStrictEqual } from 'assert';

const NoteForceGraph = ({notes, displayNote}) => {
  const graphRef = useRef();

  const getLinks = (notes) => {
    let result = []
    for (let note of notes) {
      for(let child of note.children) {
        result.push({"source": note._id, "target": child})
      } 
    }
    return result;
  }

  const getHeatmap = (notes) => {
    let result = {}
    let max = 0;
    for(let note of notes) result[note._id] = 0;
    for(let note of notes) {
      for(let child of note.children) {
        result[child]++;
        if(result[child] > max) max = result[child]
      }
    }
    return {"heatmap": result, "max": max};
  }
  const colorData = getHeatmap(notes);

  const getNodes = (notes) => {
    const result = notes.map((note) => {return {"id": note._id, "name": note.title}});
    return result;
  }

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

  const mapNums = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  useEffect(() => {
    graphRef.current.d3Force('link').distance(link => 200);
    graphRef.current.d3Force('charge').strength(node => -100);
  }, [])

  const nodeCanvasObject = (node, ctx, globalScale) => {
    const fontSize = 12;
    ctx.font = `${fontSize}px Sans-Serif`;
    const wrappedText = wrapText(node.name, 100, ctx)
    const textWidth = wrappedText.maxWidth;
    const textHeight = fontSize * wrappedText.lines.length;
    
    const radius = Math.max(textWidth, textHeight) * 0.8
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';

    if(!('x' in node)) return;

    var grd = ctx.createRadialGradient(node.x, node.y, 5, node.x, node.y, radius);
    const color = mapNums(colorData.heatmap[node.id], 0, colorData.max, 255, 0)
    grd.addColorStop(0, `rgb(255, ${color}, ${color}`);
    grd.addColorStop(1, "white");
    ctx.fillStyle = grd;

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
    {notes && <div>
      <ForceGraph2D
        ref={graphRef}
        graphData={{"nodes": getNodes(notes), "links": getLinks(notes)}}
        nodeCanvasObject={nodeCanvasObject}
        nodePointerAreaPaint={nodePointerAreaPaint}
        nodeRelSize={20}
        linkColor={() => "#222222"}
        linkDirectionalArrowLength={20}
        linkDirectionalArrowRelPos={0.5}
        linkWidth={5}
        onNodeClick={(node) => displayNote(node.id)}
        cooldownTicks={100}
      />
    </div>
  }</div>);
}

export default NoteForceGraph;