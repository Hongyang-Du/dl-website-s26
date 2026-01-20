"use client";

import React, { useState, useMemo } from "react";
import styles from "./SessionModal.module.css";
import { FaSearch, FaTimes, FaUsers } from "react-icons/fa";

export interface GroupData {
  groupName: string;
  members: string[];
}

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionTitle: string;
  sessionTime: string;
  groups: GroupData[];
}

const SessionModal: React.FC<SessionModalProps> = ({
  isOpen,
  onClose,
  sessionTitle,
  sessionTime,
  groups,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter groups based on search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groups;

    const query = searchQuery.toLowerCase();
    return groups.filter((group) => {
      // Search in group name
      if (group.groupName.toLowerCase().includes(query)) return true;

      // Search in member names
      return group.members.some((member) =>
        member.toLowerCase().includes(query)
      );
    });
  }, [groups, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <FaUsers className={styles.headerIcon} />
            <div>
              <h2 className={styles.title}>{sessionTitle}</h2>
              <p className={styles.subtitle}>{sessionTime}</p>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by group name or student name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <button
              className={styles.clearButton}
              onClick={() => setSearchQuery("")}
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className={styles.resultsCount}>
          {filteredGroups.length} group{filteredGroups.length !== 1 ? "s" : ""}{" "}
          found
        </div>

        {/* Groups List */}
        <div className={styles.groupsList}>
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group, index) => (
              <div key={index} className={styles.groupCard}>
                <h3 className={styles.groupName}>{group.groupName}</h3>
                <div className={styles.membersList}>
                  {group.members.map((member, memberIndex) => (
                    <div key={memberIndex} className={styles.member}>
                      <span className={styles.memberDot}>•</span>
                      {member}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No groups found matching &quot;{searchQuery}&quot;</p>
              <p className={styles.noResultsHint}>
                Try searching with a different name or group
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
