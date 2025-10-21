package com.qintess.lgpd.model;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.*;

//@Embeddable
@Entity
@Table(name = "resposta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Resposta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Faz o mapeamento 1:1 e usa o id do Processos
    //@MapsId
    @ManyToOne    
    @JoinColumn(name = "processo_id")               // coluna id em resposta = id do processo
    private Processos processo;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "id", column = @Column(name = "questao_id")),
            @AttributeOverride(name = "tipo", column = @Column(name = "questao_tipo")),
            @AttributeOverride(name = "titulo", column = @Column(name = "questao_titulo")),
            @AttributeOverride(name = "resposta", column = @Column(name = "questao_resposta")),
            @AttributeOverride(name = "itens", column = @Column(name = "questao_itens")),
            @AttributeOverride(name = "opcoes", column = @Column(name = "questao_opcoes")),
            @AttributeOverride(name = "arquivo", column = @Column(name = "questao_arquivo"))
    })
    
    //@ManyToOne
    @JoinColumn(name = "questao_id")
    private Questao questao;

    private String textoResposta;

    @Column(name = "respondido_em")
    private LocalDate respondidoEm;

    private String status;
    
    @ManyToOne
    @JoinColumn(name = "processo_pessoa_id")
    private ProcessosPessoas processosPessoas;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Processos getProcesso() {
        return processo;
    }

    public void setProcesso(Processos processo) {
        this.processo = processo;
    }

    public Questao getQuestao() {
        return questao;
    }

    public void setQuestao(Questao questao) {
        this.questao = questao;
    }

    public String getTextoResposta() {
        return textoResposta;
    }

    public void setTextoResposta(String textoResposta) {
        this.textoResposta = textoResposta;
    }

    public LocalDate getRespondidoEm() {
        return respondidoEm;
    }

    public void setRespondidoEm(LocalDate respondidoEm) {
        this.respondidoEm = respondidoEm;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
