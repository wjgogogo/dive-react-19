import React from "react";

const taskQueue = [];

let id = 0;

function schedule(execute: () => void, priority: number) {
  const task = {
    id: id++,
    execute,
    priority
  };
  push(task);
  console.log("schedule task: ", task);
  workLoop();
}

function workLoop() {
  while (taskQueue.length) {
    const task = peek();
    console.log("perform task: ", task);
    task.execute();
  }
}

function push(task) {
  taskQueue.push(task);
  taskQueue.sort((a, b) => {
    // 先比较优先级，如果优先级相同，再比较 id
    const diff = a.priority - b.priority;
    return diff !== 0 ? diff : a.id - b.id;
  });
}

function peek() {
  return taskQueue.shift();
}

export default () => {
  const onHighPriorityClick = () => {
    const execute = () => {
      const container = document.getElementById("mini-scheduler");
      if (container) {
        const node = document.createElement("div");
        node.innerText += Date.now();
        container.appendChild(node);
      }
    };

    schedule(execute, /* 0 代表高优先级*/ 0);
    schedule(execute, /* 0 代表高优先级*/ 0);
  };

  const onLowPriorityClick = () => {
    const execute = () => {
      const container = document.getElementById("mini-scheduler");
      if (container) {
        container?.classList.toggle("bg-sky-500");
      }
    };

    schedule(execute, /* 1 代表低优先级*/ 1);
  };

  const onMixPriorityClick = () => {
    schedule(() => {
      const container = document.getElementById("mini-scheduler");
      if (container) {
        const node = document.createElement("div");
        node.innerText += "低优";
        container.appendChild(node);
      }
    }, 1);

    schedule(() => {
      const container = document.getElementById("mini-scheduler");
      if (container) {
        const node = document.createElement("div");
        node.innerText += "高优";
        container.appendChild(node);
      }
    }, 0);
  };

  return (
    <div className="rounded-sm border-2! border-gray-400! p-2">
      <div className="mb-2">
        <button
          className="mr-2 rounded-lg border-2! border-solid border-gray-500 p-2 text-sm"
          onClick={onHighPriorityClick}
        >
          高优先级任务
        </button>
        <button
          className="mr-2 rounded-lg border-2! border-solid border-gray-500 p-2 text-sm"
          onClick={onLowPriorityClick}
        >
          低优先级任务
        </button>
        <button
          className="mr-2 rounded-lg border-2! border-solid border-gray-500 p-2 text-sm"
          onClick={onMixPriorityClick}
        >
          混合优先级任务
        </button>
      </div>
      <div id="mini-scheduler" />
    </div>
  );
};
