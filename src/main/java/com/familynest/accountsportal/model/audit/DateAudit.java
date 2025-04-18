package com.familynest.accountsportal.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(
        value = {"createdAt", "updatedAt"},
        allowGetters = true
)
@Getter
@Setter
public abstract class DateAudit implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private Instant updatedAt;
    
    @Column(name = "system_created")
    private String systemCreated;
    
    @Column(name = "system_updated")
    private String systemUpdated;
    
    public ZonedDateTime getCreatedAtUTC() {
        return ZonedDateTime.ofInstant(createdAt, ZoneId.of("UTC"));
    }
    
    public ZonedDateTime getCreatedAtIST() {
        return ZonedDateTime.ofInstant(createdAt, ZoneId.of("Asia/Kolkata"));
    }
    
    public ZonedDateTime getUpdatedAtUTC() {
        return ZonedDateTime.ofInstant(updatedAt, ZoneId.of("UTC"));
    }
    
    public ZonedDateTime getUpdatedAtIST() {
        return ZonedDateTime.ofInstant(updatedAt, ZoneId.of("Asia/Kolkata"));
    }
    
    // Explicit getter and setter methods for systemCreated and systemUpdated
    public String getSystemCreated() {
        return systemCreated;
    }
    
    public void setSystemCreated(String systemCreated) {
        this.systemCreated = systemCreated;
    }
    
    public String getSystemUpdated() {
        return systemUpdated;
    }
    
    public void setSystemUpdated(String systemUpdated) {
        this.systemUpdated = systemUpdated;
    }
    
    public Instant getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
    
    public Instant getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
