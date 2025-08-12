
import React from "react";
const taskQueue = [];

let id = 0;

function schedule(execute: () => void, priority: number) {
  // 根据优先级计算出任务的过期时间，并以过期时间作为排序依据
  // 即使在插入底优任务后，不断有高优任务插入，也能保证随着时间的推移，底优任务被排在第一位
  let timeout;
  if (priority === 0) {
    timeout = 0;
  } else {
    timeout = 100;
  }
  const expirationTime = Date.now() + timeout;
  const task = {
    id: id++,
    execute,
    expirationTime
  };
  push(task);
  console.log("schedule task: ", task);
  scheduleWorkLoop();
}

// 标识 loop 是否在执行中
let isLoopRunning = false;

function scheduleWorkLoop() {
  // 只有在 loop 没有启动时，才需要 schedule
  if (!isLoopRunning) {
    isLoopRunning = true;
    // 暂时用 setTimeout 做延迟处理
    setTimeout(() => {
      workLoop();
    }, 0);
  }
}

function workLoop() {
  while (taskQueue.length) {
    const task = peek();
    console.log("perform task: ", task);
    task.execute();
  }
  isLoopRunning = false;
}

function push(task) {
  taskQueue.push(task);
  taskQueue.sort((a, b) => {
    // 先比较过期时间，再比较 id
    const diff = a.expirationTime - b.expirationTime;
    return diff !== 0 ? diff : a.id - b.id;
  });
}

function peek() {
  return taskQueue.shift();
}

export default () => {
  const onHighPriorityClick = () => {
    const execute = () => {
      const container = document.getElementById("mini-scheduler-v2");
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
      const container = document.getElementById("mini-scheduler-v2");
      if (container) {
        container?.classList.toggle("bg-sky-500");
      }
    };

    schedule(execute, /* 1 代表低优先级*/ 1);
  };

  const onMixPriorityClick = () => {
    schedule(() => {
      const container = document.getElementById("mini-scheduler-v2");
      if (container) {
        const node = document.createElement("div");
        node.innerText += "低优";
        container.appendChild(node);
      }
    }, 1);

    schedule(() => {
      const container = document.getElementById("mini-scheduler-v2");
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
      <div id="mini-scheduler-v2" />
    </div>
  );
};
