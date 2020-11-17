package com.mycompany.myapp.batch;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

public class BatchJobScheduler {
  @Autowired
  private JobLauncher launcher;

  @Autowired
  private Job job;

  private JobExecution execution;

  //TODO: jd - test the cron job properly - to be run every 5 minutes.
  @Scheduled (cron = "0/5 * * * * ?")
  public void run() {
    try {
      execution = launcher.run(job, new JobParameters());
      System.out.println("Execution status: " + execution.getStatus());
    } catch (JobExecutionAlreadyRunningException e) {
      e.printStackTrace();
    } catch (JobRestartException e) {
      e.printStackTrace();
    } catch (JobInstanceAlreadyCompleteException e) {
      e.printStackTrace();
    } catch (JobParametersInvalidException e) {
      e.printStackTrace();
    }
  }
}
