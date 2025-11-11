import React, { useState, useMemo, useCallback } from "react";
import {
  Check,
  ArrowUpDown,
  Settings2,
  Power,
  Download,
  Edit,
} from "lucide-react";
import { Button } from "../../atoms/Button/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../organisms/Table";
import { Checkbox } from "../../atoms/Checkbox";
import { Badge } from "../../atoms/Badge";
import { Avatar, AvatarFallback } from "../../atoms/Avatar";
import { Tooltip, TooltipTrigger, TooltipContent } from "../../atoms/Tooltip";
import "./UserManagementTable.css";

export interface User {
  id: string;
  name: string;
  role: "admin" | "user";
  modules: string[];
  recordLimit: number;
  timeWindowDays: number;
  maskShodan: boolean;
  hashIdentifiers: boolean;
  aiAssistant: boolean;
}

export interface Module {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface UserManagementTableProps {
  users: User[];
  modules: Module[];
  onUserEdit?: (user: User) => void;
  onBulkUpdate?: (userIds: string[]) => void;
  onBulkActivate?: (userIds: string[]) => void;
  onBulkExport?: (userIds: string[]) => void;
  pageSize?: number;
  className?: string;
}

type SortColumn = "name" | "role" | null;
type SortDirection = "asc" | "desc";

export const UserManagementTable: React.FC<UserManagementTableProps> = ({
  users,
  modules,
  onUserEdit,
  onBulkUpdate,
  onBulkActivate,
  onBulkExport,
  pageSize = 10,
  className,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered users (for now, just use all users - filtering can be added later)
  const filteredUsers = useMemo(() => users, [users]);

  // Sorted users
  const sortedUsers = useMemo(() => {
    if (!sortColumn) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      let aValue: string;
      let bValue: string;

      if (sortColumn === "name") {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      } else if (sortColumn === "role") {
        aValue = a.role;
        bValue = b.role;
      } else {
        return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortColumn, sortDirection]);

  // Paginated users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedUsers.slice(startIndex, endIndex);
  }, [sortedUsers, currentPage, pageSize]);

  // Toggle sort
  const toggleSort = useCallback((column: "name" | "role") => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }, [sortColumn, sortDirection]);

  // Selection handlers
  const toggleUserSelection = useCallback((userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  }, []);

  const toggleAllUsers = useCallback(() => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  }, [selectedUsers.length, filteredUsers]);

  // Check if user has module access
  const hasModule = useCallback((user: User, moduleId: string) => {
    return user.modules.includes(moduleId);
  }, []);

  // Total pages
  const totalPages = Math.ceil(sortedUsers.length / pageSize);

  return (
    <div className={`arkem-user-table ${className || ""}`}>
      {/* Batch Actions Toolbar */}
      {selectedUsers.length > 0 && (
        <div className="arkem-user-table__toolbar">
          <div className="arkem-user-table__toolbar-left">
            <Checkbox
              checked={selectedUsers.length === filteredUsers.length}
              onCheckedChange={toggleAllUsers}
            />
            <span className="arkem-user-table__toolbar-text">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? "s" : ""} selected
            </span>
          </div>
          <div className="arkem-user-table__toolbar-actions">
            <Button
              size="sm"
              hierarchy="secondary"
              tone="black"
              leadingIconName="Settings2"
              onClick={() => onBulkUpdate?.(selectedUsers)}
            >
              Bulk Update
            </Button>
            <Button
              size="sm"
              hierarchy="secondary"
              tone="black"
              leadingIconName="Power"
              onClick={() => onBulkActivate?.(selectedUsers)}
            >
              Activate/Deactivate
            </Button>
            <Button
              size="sm"
              hierarchy="secondary"
              tone="black"
              leadingIconName="Download"
              onClick={() => onBulkExport?.(selectedUsers)}
            >
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="arkem-user-table__container">
        <Table ariaLabel="User Management Table">
          <TableHeader>
            {/* Group Header Row */}
            <TableRow isEven={false}>
              <TableHead
                colSpan={3}
                className="arkem-table__head--group-header arkem-table__head--divider-subtle"
                style={{
                  textAlign: "center",
                  fontSize: "var(--fonts-semantic-sm)",
                  fontWeight: "var(--font-weight-semibold)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  padding: "var(--spacing-12) var(--spacing-style-spacing-4px-4-16px)",
                  textTransform: "uppercase",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                USERS
              </TableHead>
              <TableHead
                colSpan={modules.length}
                className="arkem-table__head--group-header arkem-table__head--divider-subtle"
                style={{
                  textAlign: "center",
                  fontSize: "var(--fonts-semantic-sm)",
                  fontWeight: "var(--font-weight-semibold)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  padding: "var(--spacing-12) var(--spacing-style-spacing-4px-4-16px)",
                  textTransform: "uppercase",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                MODULE ACCESS
              </TableHead>
              <TableHead
                colSpan={5}
                className="arkem-table__head--group-header arkem-table__head--divider-subtle"
                style={{
                  textAlign: "center",
                  fontSize: "var(--fonts-semantic-sm)",
                  fontWeight: "var(--font-weight-semibold)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  padding: "var(--spacing-12) var(--spacing-style-spacing-4px-4-16px)",
                  textTransform: "uppercase",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                DATA ACCESS
              </TableHead>
              <TableHead
                sticky
                stickyRight
                rowSpan={2}
                className="arkem-table__head--group-header"
                style={{
                  width: "64px",
                  textAlign: "center",
                  fontSize: "var(--fonts-semantic-sm)",
                  fontWeight: "var(--font-weight-semibold)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  padding: "var(--spacing-12) var(--spacing-style-spacing-4px-4-16px)",
                  textTransform: "uppercase",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                ACTIONS
              </TableHead>
            </TableRow>
            <TableRow isEven={false}>
              <TableHead
                className="arkem-table__head--subheader arkem-table__head--divider-muted"
                style={{
                  width: "var(--component-table-checkbox-column-width)",
                  fontSize: "var(--fonts-semantic-md)",
                  fontWeight: "var(--font-weight-semibold)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--semantic-text-secondary)",
                  textAlign: "center",
                }}
              >
                <Checkbox
                  checked={
                    filteredUsers.length > 0 &&
                    selectedUsers.length === filteredUsers.length
                  }
                  onCheckedChange={toggleAllUsers}
                />
              </TableHead>
              <TableHead
                sortable
                onClick={() => toggleSort("name")}
                className="arkem-table__head--subheader arkem-table__head--divider-muted"
                style={{
                  width: "var(--component-table-sticky-column-width)",
                  fontSize: "var(--fonts-semantic-md)",
                  fontWeight: "var(--font-weight-semibold)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                <div className="arkem-user-table__sort-header">
                  User
                  <ArrowUpDown className="arkem-user-table__sort-icon" />
                </div>
              </TableHead>
              <TableHead
                sortable
                onClick={() => toggleSort("role")}
                className="arkem-table__head--subheader arkem-table__head--divider-subtle"
                style={{
                  fontSize: "var(--fonts-semantic-md)",
                  fontWeight: "var(--font-weight-semibold)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                <div className="arkem-user-table__sort-header">
                  Role
                  <ArrowUpDown className="arkem-user-table__sort-icon" />
                </div>
              </TableHead>
              {modules.map((module, moduleIndex) => {
                const IconComponent = module.icon;
                const isLastModule = moduleIndex === modules.length - 1;
                return (
                  <TableHead
                    key={module.id}
                    className={`arkem-table__head--subheader ${isLastModule ? "arkem-table__head--divider-subtle" : "arkem-table__head--divider-muted"}`}
                    style={{
                      textAlign: "center",
                      width: "var(--component-table-module-column-width)",
                      padding: "var(--spacing-style-spacing-4px-4-16px)",
                      color: "var(--semantic-text-secondary)",
                    }}
                  >
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger asChild>
                        <div className="arkem-user-table__module-icon">
                          <IconComponent className="arkem-user-table__module-icon-svg" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" sideOffset={4}>
                        {module.name}
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                );
              })}
              <TableHead
                className="arkem-table__head--subheader arkem-table__head--divider-muted"
                style={{
                  textAlign: "center",
                  width: "var(--component-table-data-column-width)",
                  padding: "var(--spacing-style-spacing-4px-4-16px)",
                  fontSize: "var(--fonts-semantic-md)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Record Limit
              </TableHead>
              <TableHead
                className="arkem-table__head--subheader arkem-table__head--divider-muted"
                style={{
                  textAlign: "center",
                  width: "var(--component-table-data-column-width)",
                  padding: "var(--spacing-style-spacing-4px-4-16px)",
                  fontSize: "var(--fonts-semantic-md)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Time Window (Days)
              </TableHead>
              <TableHead
                className="arkem-table__head--subheader arkem-table__head--divider-muted"
                style={{
                  textAlign: "center",
                  width: "var(--component-table-data-column-width)",
                  padding: "var(--spacing-style-spacing-4px-4-16px)",
                  fontSize: "var(--fonts-semantic-md)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Mask Shodan
              </TableHead>
              <TableHead
                className="arkem-table__head--subheader arkem-table__head--divider-muted"
                style={{
                  textAlign: "center",
                  width: "var(--component-table-data-column-width)",
                  padding: "var(--spacing-style-spacing-4px-4-16px)",
                  fontSize: "var(--fonts-semantic-md)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                Hash Identifiers
              </TableHead>
              <TableHead
                className="arkem-table__head--subheader arkem-table__head--divider-subtle"
                style={{
                  textAlign: "center",
                  width: "var(--component-table-data-column-width)",
                  padding: "var(--spacing-style-spacing-4px-4-16px)",
                  fontSize: "var(--fonts-semantic-md)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--semantic-text-secondary)",
                }}
              >
                AI Assistant
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user, index) => {
              const isEven = index % 2 === 0;
              const isSelected = selectedUsers.includes(user.id);
              return (
                <TableRow
                  key={user.id}
                  isEven={isEven}
                  isSelected={isSelected}
                  style={{ height: "var(--component-table-body-row-height)" }}
                >
                  <TableCell className="arkem-table__cell--divider-subtle" style={{ textAlign: "center" }}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleUserSelection(user.id)}
                    />
                  </TableCell>
                  <TableCell
                    className="arkem-table__cell--divider-muted"
                    style={{
                      width: "var(--component-table-sticky-column-width)",
                      fontSize: "var(--fonts-semantic-md)",
                      padding: "var(--spacing-12)",
                    }}
                  >
                    <div className="arkem-user-table__user-cell">
                      <Avatar>
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span style={{ color: "var(--semantic-text-primary)" }}>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="arkem-table__cell--divider-subtle" style={{ textAlign: "center", fontSize: "var(--fonts-semantic-md)", padding: "var(--spacing-12)" }}>
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                      style={{ fontWeight: "var(--font-weight-medium)" }}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  {modules.map((module, moduleIndex) => {
                    const isLastModule = moduleIndex === modules.length - 1;
                    return (
                      <TableCell
                        key={module.id}
                        className={isLastModule ? "arkem-table__cell--divider-subtle" : "arkem-table__cell--divider-muted"}
                        style={{
                          textAlign: "center",
                          padding: "var(--spacing-12)",
                        }}
                      >
                      {hasModule(user, module.id) ? (
                        <div className="arkem-user-table__check-icon">
                          <Check className="arkem-user-table__check-icon-svg" />
                        </div>
                      ) : (
                        <div className="arkem-user-table__check-icon">
                          <Check className="arkem-user-table__check-icon-svg--inactive" />
                        </div>
                      )}
                    </TableCell>
                  );
                  })}
                  <TableCell
                    className="arkem-table__cell--divider-muted"
                    style={{
                      textAlign: "center",
                      fontSize: "var(--fonts-semantic-md)",
                      padding: "var(--spacing-12)",
                      color: "var(--semantic-text-subtle)",
                    }}
                  >
                    {user.recordLimit}
                  </TableCell>
                  <TableCell
                    className="arkem-table__cell--divider-muted"
                    style={{
                      textAlign: "center",
                      fontSize: "var(--fonts-semantic-md)",
                      padding: "var(--spacing-12)",
                      color: "var(--semantic-text-subtle)",
                    }}
                  >
                    {user.timeWindowDays}
                  </TableCell>
                  <TableCell className="arkem-table__cell--divider-muted" style={{ textAlign: "center", padding: "var(--spacing-12)" }}>
                    {user.maskShodan ? (
                      <div className="arkem-user-table__check-icon">
                        <Check className="arkem-user-table__check-icon-svg" />
                      </div>
                    ) : (
                      <div className="arkem-user-table__check-icon">
                        <Check className="arkem-user-table__check-icon-svg--inactive" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="arkem-table__cell--divider-muted" style={{ textAlign: "center", padding: "var(--spacing-12)" }}>
                    {user.hashIdentifiers ? (
                      <div className="arkem-user-table__check-icon">
                        <Check className="arkem-user-table__check-icon-svg" />
                      </div>
                    ) : (
                      <div className="arkem-user-table__check-icon">
                        <Check className="arkem-user-table__check-icon-svg--inactive" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="arkem-table__cell--divider-subtle" style={{ textAlign: "center", padding: "var(--spacing-12)" }}>
                    {user.aiAssistant ? (
                      <div className="arkem-user-table__check-icon">
                        <Check className="arkem-user-table__check-icon-svg" />
                      </div>
                    ) : (
                      <div className="arkem-user-table__check-icon">
                        <Check className="arkem-user-table__check-icon-svg--inactive" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell
                    sticky
                    stickyRight
                    style={{ textAlign: "center", padding: "var(--spacing-12)" }}
                  >
                    <Button
                      size="sm"
                      hierarchy="secondary"
                      tone="black"
                      function="borderless"
                      trailingIconName="Edit"
                      showText={false}
                      iconTrailing={true}
                      iconLeading={false}
                      onClick={() => onUserEdit?.(user)}
                      ariaLabel={`Edit ${user.name}`}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="arkem-user-table__empty">
          No users found matching the current filters.
        </div>
      )}
    </div>
  );
};

