package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class FarmTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Farm.class);
        Farm farm1 = new Farm();
        farm1.setId(1L);
        Farm farm2 = new Farm();
        farm2.setId(farm1.getId());
        assertThat(farm1).isEqualTo(farm2);
        farm2.setId(2L);
        assertThat(farm1).isNotEqualTo(farm2);
        farm1.setId(null);
        assertThat(farm1).isNotEqualTo(farm2);
    }
}
