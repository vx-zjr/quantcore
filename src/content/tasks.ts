// 正文任务项（- [ ] / - [x]）工具。计数规则须与 scripts/content/writer.ts 的 toggleTask 保持一致。

const TASK_RE = /^(\s*[-*+] \[)([ xX])(\] )/;

/** 正文中任务项的 1 起始行号（跳过代码块） */
export function taskLineNumbers(body: string): number[] {
  const out: number[] = [];
  let inFence = false;
  body.split('\n').forEach((line, i) => {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (!inFence && TASK_RE.test(line)) out.push(i + 1);
  });
  return out;
}

/** 统计任务项完成度 */
export function taskStats(body: string) {
  const lines = body.split('\n');
  const idx = taskLineNumbers(body);
  const done = idx.filter((n) => TASK_RE.exec(lines[n - 1])![2] !== ' ').length;
  return { done, total: idx.length };
}

/** 返回勾选/取消第 index 个任务项后的正文（用于乐观更新） */
export function setTask(body: string, index: number, checked: boolean): string {
  const lines = body.split('\n');
  const n = taskLineNumbers(body)[index];
  if (n === undefined) return body;
  lines[n - 1] = lines[n - 1].replace(TASK_RE, `$1${checked ? 'x' : ' '}$3`);
  return lines.join('\n');
}
