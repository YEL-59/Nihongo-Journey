#!/usr/bin/env bash
set -euo pipefail

TASK_ID="${1:-}"
TASK_FILE="planning/task.md"
UPDATE_FILE="planning/updateplanning.md"

if [ ! -f "$TASK_FILE" ]; then
  echo "Error: $TASK_FILE not found."
  exit 1
fi

if [ -z "$TASK_ID" ]; then
  echo "=========================================================="
  echo "  EasyTemplate Task Status Dashboard"
  echo "=========================================================="
  if [ -f "$UPDATE_FILE" ]; then
    grep "\*\*Active Task\*\*:" "$UPDATE_FILE" || true
  fi
  echo ""
  echo "Task Board Summary:"
  grep -E "^\|.*TASK-" "$TASK_FILE" || true
  echo ""
  echo "Tip: Run ./scripts/check-task.sh TASK-001 to view full task details."
else
  SPEC_FILE="planning/tasks/${TASK_ID}.md"
  if [ -f "$SPEC_FILE" ]; then
    echo "=========================================================="
    echo "  Task Details: ${TASK_ID}"
    echo "=========================================================="
    cat "$SPEC_FILE"
  else
    echo "Task specification file not found: $SPEC_FILE"
    exit 1
  fi
fi
