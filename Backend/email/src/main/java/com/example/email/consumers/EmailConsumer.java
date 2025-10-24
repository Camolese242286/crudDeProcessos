package com.example.email.consumers;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.example.email.dto.EmailRecordDto;


@Component
public class EmailConsumer {

	@RabbitListener(queues ="${broker.queue.email.name}")
	public void listenEmailQueue(@Payload EmailRecordDto emailRecordDto) {
		System.out.println(emailRecordDto.emailDto());
		
		//System.out.println(emailRecordDto.subject());
		
	   // System.out.println(emailRecordDto.text());
	}
}
