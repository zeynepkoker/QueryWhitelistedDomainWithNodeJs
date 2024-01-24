import dns.resolver
import sys
# Set the target domain and record type
target_domain = sys.argv[1]
record_types = ["A", "AAAA", "MX"]
# Create a DNS resolver
resolver = dns.resolver.Resolver()
for record_type in record_types:
    # Perform DNS lookup for the specified domain and record type
    try:
        answers = resolver.resolve(target_domain, record_type)
    except dns.resolver.NoAnswer:
        continue
    # Print the answers
    array = [str(record_type)]
    answersStr = str(record_type)+"---"
    for rdata in answers:
        answersStr += str(rdata)+","
    print(answersStr[:len(answersStr)-1])
sys.stdout.flush()