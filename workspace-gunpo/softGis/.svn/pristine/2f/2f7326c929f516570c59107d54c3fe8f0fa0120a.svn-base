package softGis.core;

import java.sql.Array;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.apache.ibatis.type.TypeException;

@MappedJdbcTypes(JdbcType.ARRAY)
@MappedTypes(List.class)
public class MyBatisListTypeHandler extends BaseTypeHandler<List<?>> {
	
    private static final String TYPE_NAME_VARCHAR = "varchar";
    private static final String TYPE_NAME_INTEGER = "integer";
    private static final String TYPE_NAME_BOOLEAN = "boolean";
    private static final String TYPE_NAME_NUMERIC = "numeric";

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, List<?> parameter, JdbcType jdbcType) throws SQLException {
        String typeName = null;
        Object typeElement = parameter.get(0);

        if (typeElement instanceof Integer) {
            typeName = TYPE_NAME_INTEGER;
        } else if (typeElement instanceof String) {
            typeName = TYPE_NAME_VARCHAR;
        } else if (typeElement instanceof Boolean) {
            typeName = TYPE_NAME_BOOLEAN;
        } else if (typeElement instanceof Double) {
            typeName = TYPE_NAME_NUMERIC;
        }
 
        if (typeName == null) {
            throw new TypeException("ArrayTypeHandler parameter typeName error, your type is " + parameter.getClass().getName());
        }
        
        Connection conn = ps.getConnection();
        Array array = conn.createArrayOf(typeName, parameter.toArray());
        ps.setArray(i, array);
	}
 
    @Override
    public List<?> getNullableResult(ResultSet resultSet, String s) throws SQLException {
        return getArray(resultSet.getArray(s));
    }
 
    @Override
    public List<?> getNullableResult(ResultSet resultSet, int i) throws SQLException {
        return getArray(resultSet.getArray(i));
    }
 
    @Override
    public List<?> getNullableResult(CallableStatement callableStatement, int i) throws SQLException {
        return getArray(callableStatement.getArray(i));
    }
 
    private List<?> getArray(Array array) {
        if (array == null) {
            return null;
        }
        
        try {
            return (List<?>) Arrays.asList(array);
        } catch (Exception e) { }
        
        return null;
    }
}

class GenericClass<T> {

    private final Class<T> type;

    public GenericClass(Class<T> type) {
         this.type = type;
    }

    public Class<T> getMyType() {
        return this.type;
    }
}