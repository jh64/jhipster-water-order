package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

import com.mycompany.myapp.domain.enumeration.Status;

/**
 * A WaterOrder.
 */
@Entity
@Table(name = "water_order")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WaterOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "start_timestamp", nullable = false)
    private Instant startTimestamp;

    @NotNull
    @Column(name = "duration", nullable = false)
    private Integer duration;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @ManyToOne
    @JsonIgnoreProperties(value = "waterOrders", allowSetters = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = "waterOrders", allowSetters = true)
    private Farm farm;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getStartTimestamp() {
        return startTimestamp;
    }

    public WaterOrder startTimestamp(Instant startTimestamp) {
        this.startTimestamp = startTimestamp;
        return this;
    }

    public void setStartTimestamp(Instant startTimestamp) {
        this.startTimestamp = startTimestamp;
    }

    public Integer getDuration() {
        return duration;
    }

    public WaterOrder duration(Integer duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Status getStatus() {
        return status;
    }

    public WaterOrder status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public WaterOrder user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Farm getFarm() {
        return farm;
    }

    public WaterOrder farm(Farm farm) {
        this.farm = farm;
        return this;
    }

    public void setFarm(Farm farm) {
        this.farm = farm;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WaterOrder)) {
            return false;
        }
        return id != null && id.equals(((WaterOrder) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WaterOrder{" +
            "id=" + getId() +
            ", startTimestamp='" + getStartTimestamp() + "'" +
            ", duration=" + getDuration() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
