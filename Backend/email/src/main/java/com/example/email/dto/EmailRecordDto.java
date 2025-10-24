package com.example.email.dto;

import java.util.UUID;

public record EmailRecordDto(UUID userid,String emailDto ,String subject , String text) {

}
