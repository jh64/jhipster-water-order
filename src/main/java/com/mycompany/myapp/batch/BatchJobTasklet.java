package com.mycompany.myapp.batch;

import java.time.Instant;
import java.util.Iterator;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import com.mycompany.myapp.domain.WaterOrder;
import com.mycompany.myapp.domain.enumeration.Status;
import com.mycompany.myapp.repository.WaterOrderRepository;

public class BatchJobTasklet implements Tasklet {
  @Autowired
  private WaterOrderRepository waterOrderRepository;

  @Override
  public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext)
      throws Exception {
    fuctionToRun();
    return null;
  }
  
  void fuctionToRun() {
    for (Iterator<WaterOrder> iterator = waterOrderRepository.findAllInprogress().iterator(); iterator.hasNext();) {
      WaterOrder waterOrder = iterator.next();
      Instant currentTime = Instant.now();

      if (waterOrder.getStartTimestamp().isAfter(currentTime)) {
        //TODO: jd - spawn a thread to process the order for the logic of below 2 lines
        //      so as to process all order asynchronously.
        System.out.println("process order for farmer " + waterOrder.getUser() + " started at " + currentTime);
        waterOrder.setStatus(Status.INPROGRESS);
      }
    }
  }
}
