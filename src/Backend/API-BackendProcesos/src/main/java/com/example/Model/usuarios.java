import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class usuarios {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
    
	private String username;
    
    private String name;
    private String CreatedBy;
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsarname() {
		return username;
	}

	public void setUsarname(String usarname) {
		this.username = usarname;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCreatedBy() {
		return CreatedBy;
	}

	public void setCreatedBy(String createdBy) {
		CreatedBy = createdBy;
	}

	public void setCreatedBy1(String username2) {
		// TODO Auto-generated method stub
		
	}


}