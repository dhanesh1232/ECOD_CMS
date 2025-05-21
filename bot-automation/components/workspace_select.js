"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import { useToast } from "./ui/toast-provider";
import { WorkspaceService } from "@/lib/client/team";
export default React.memo(function SelectWorkspace({
  className,
  mobile,
  isCollapsed,
}) {
  const showToast = useToast();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const workspaceId = params.workspaceId;
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [loading, setLoading] = useState(true);
  const toastRef = useRef(false);
  const fetchWorkspaces = useCallback(async () => {
    setLoading(true);
    try {
      const data = await WorkspaceService.checkCurrentWorkspaceRole();
      setSelectedWorkspace(data.currentWorkspace);
      setWorkspaces(data.workspaces);
      if (data) {
        setLoading(false);
      }
    } catch (err) {
      if (!toastRef.current) {
        showToast({
          message: "Please trye again",
          variant: "warning",
        });
        toastRef.current = true;
      }
    }
  }, [showToast]);

  useEffect(() => {
    if (workspaces.length === 0) {
      fetchWorkspaces();
    }
  }, [fetchWorkspaces, workspaces.length]);
  const handleWorkspaceChange = async (workspaceId) => {
    try {
      const response = await fetch(`/api/workspaces/${workspaceId}/switch`, {
        method: "POST",
      });

      if (response.ok) {
        setSelectedWorkspace(workspaceId);
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to switch workspace:", error);
    }
  };

  const workspaceItems = React.useMemo(() => {
    return workspaces.map((workspace) => (
      <SelectItem
        key={workspace.id}
        value={workspace.id}
        className="flex items-center gap-2"
      >
        <span className="truncate">{workspace.name}</span>
        {workspace.subscription?.plan !== "free" && (
          <span className="text-xs text-muted-foreground ml-2">
            ({workspace.subscription.plan})
          </span>
        )}
      </SelectItem>
    ));
  }, [workspaces]);

  return (
    <div className={className}>
      <Select
        open={open}
        onOpenChange={setOpen}
        value={selectedWorkspace}
        onValueChange={handleWorkspaceChange}
        disabled={loading}
      >
        <SelectTrigger className="w-full radix-select-trigger">
          {loading ? (
            <div className="flex items-center gap-2 w-full">
              <svg
                className="animate-spin h-4 w-4 text-current"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {!isCollapsed && <span>Loading workspaces...</span>}
            </div>
          ) : (
            <SelectValue
              className="mr-1"
              placeholder={
                isCollapsed
                  ? mobile
                    ? "Select Workspace"
                    : ""
                  : "Select Workspace"
              }
            >
              {isCollapsed && !mobile
                ? workspaces.find((each) => each.id === selectedWorkspace)
                    ?.name?.[0]
                : workspaces.find((each) => each.id === selectedWorkspace)
                    ?.name}
            </SelectValue>
          )}
        </SelectTrigger>
        <SelectContent
          position="popper"
          side={isCollapsed ? "right" : "bottom"}
          align={isCollapsed ? "start" : "center"}
          sideOffset={isCollapsed ? 25 : 5}
          className="radix-select-content"
          style={{
            minWidth: isCollapsed
              ? "200px"
              : "var(--radix-select-trigger-width)",
            marginLeft: isCollapsed ? "45px" : "0",
            zIndex: 1000,
          }}
        >
          {workspaceItems}
        </SelectContent>
      </Select>
    </div>
  );
});
