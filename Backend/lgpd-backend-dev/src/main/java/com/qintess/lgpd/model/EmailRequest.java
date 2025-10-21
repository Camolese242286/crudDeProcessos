package com.qintess.lgpd.model;

import lombok.Data;

import java.util.Collection;
import java.util.List;

@Data
public class EmailRequest {
	private List<String> emails;
	private String link;
	private String subject;
	private String content;
	private Long processoId;

	public List<String> getEmails() {
		return emails;
	}

	public void setEmails(List<String> emails) {
		this.emails = emails;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getProcessoId() {
		return processoId;
	}

	public void setProcessoId(Long processoId) {
		this.processoId = processoId;
	}
}
