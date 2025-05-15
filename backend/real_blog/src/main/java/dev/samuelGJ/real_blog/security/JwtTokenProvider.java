package dev.samuelGJ.real_blog.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {

	private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenProvider.class);

	@Value("${app.jwtSecret}")
	private String jwtSecret;

	@Value("${app.jwtExpirationInMs}")
	private long jwtExpirationInMs;

	private SecretKey getSigningKey() {
		byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public String generateToken(Authentication authentication) {
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

		return Jwts.builder()
				.subject(Long.toString(userPrincipal.getId()))
				.issuedAt(now)
				.expiration(expiryDate)
				.signWith(getSigningKey(), Jwts.SIG.HS512)
				.compact();
	}

	public Long getUserIdFromJWT(String token) {
		JwtParser parser = Jwts.parser()
				.verifyWith(getSigningKey())
				.build();

		Claims claims = parser.parseSignedClaims(token).getPayload();
		return Long.valueOf(claims.getSubject());
	}

	public boolean validateToken(String authToken) {
		try {
			Jwts.parser()
					.verifyWith(getSigningKey())
					.build()
					.parseSignedClaims(authToken);
			return true;
		} catch (SecurityException | MalformedJwtException e) {
			LOGGER.error("Invalid JWT signature or token structure.");
		} catch (ExpiredJwtException e) {
			LOGGER.error("Expired JWT token.");
		} catch (UnsupportedJwtException e) {
			LOGGER.error("Unsupported JWT token.");
		} catch (IllegalArgumentException e) {
			LOGGER.error("JWT claims string is empty.");
		}
		return false;
	}
}
